import { libraryDocumentModel } from '~/model/libraryDocument.model.js'
import { BadResponseError } from '~/cores/error.response.js'
import { deleteFileFromCloud } from '~/middleware/upload.middleware.js'
import { Types } from 'mongoose'
import { SubjectModel } from '~/model/libraryDocument.model.js'
import { CATEGORY_TRANSLATIONS, DOCUMENT_TYPE_TRANSLATIONS } from '~/utils/constants.js'
import { cloudinary } from '~/config/cloudinary.config.js'
import { updateNestedObjectParser, deleteUndefinedField, checkCacheAndDb } from '~/utils/helper'
import { redisService } from './redis.service'
class LibraryService {

	async getCategories() {
		const categories = await libraryDocumentModel.distinct('mainCategory')
		const documentTypes = Object.values(libraryDocumentModel.schema.path('documentType').enumValues)
		return { categories, documentTypes }
	}


	async getSubjects() {
		return await libraryDocumentModel.distinct('subject.code')
	}


	async getAllDocuments({
		page = 1,
		limit = 10,
		category,
		subject,
		documentType,
		semester,
		status = 'active',
		sortBy = 'createdAt',
		order = 'desc'
	}) {
		const query = { status: 'active' }
		if (category) query.mainCategory = category
		if (subject) query['subject.code'] = subject
		if (documentType) query.documentType = documentType
		if (semester) query.semester = semester
		if (status) query.status = status

		const sort = { [sortBy]: order === 'desc' ? -1 : 1 }

		const [documents, total] = await Promise.all([
			libraryDocumentModel
				.find(query)
				.sort(sort)
				.skip((page - 1) * limit)
				.limit(limit)
				.lean(),
			libraryDocumentModel.countDocuments(query)
		])

		return {
			documents,
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
				total,
				totalPages: Math.ceil(total / limit)
			}
		}
	}
	async getAllDocumentsByAdmin() {
		return await libraryDocumentModel.find({ status: 'active' }, '_id subject.code subject.name semester title')
			.sort({ createdAt: -1 })
	}
	async searchDocuments({ q, ...filters }) {
		const searchQuery = {
			$or: [
				{ title: { $regex: q, $options: 'i' } },
				{ 'subject.name': { $regex: q, $options: 'i' } },
				{ 'subject.code': { $regex: q, $options: 'i' } }
			],
			status: 'active'
		}

		return await this.getAllDocuments({
			...filters,
			additionalQuery: searchQuery
		})
	}

	async getDocumentById(documentId) {
		const document = await libraryDocumentModel
			.findById(documentId)
			.populate('uploadedBy', 'givenName email')
			.lean()

		if (!document) {
			throw new BadResponseError('Document not found')
		}

		return document
	}

	async getDocumentsBySubject(subjectCode, filters = {}) {
		const query = {
			'subject.code': subjectCode,
			status: 'active'
		};

		if (filters.documentType) {
			query.documentType = filters.documentType;
		}

		const documents = await libraryDocumentModel
			.find(query)
			.sort({ createdAt: -1 })
			.lean();

		return documents.map(doc => ({
			...doc,
			documentTypeName: DOCUMENT_TYPE_TRANSLATIONS[doc.documentType],
			subjectCategoryName: CATEGORY_TRANSLATIONS[doc.subject.category]
		}));
	}
	async getDocumentsBySubjectRedis(subjectCode, filters = {}) {

		console.log(subjectCode)
		const result = await checkCacheAndDb('library', subjectCode, this.getDocumentsBySubject, filters)
		return result
	}
	async getDocumentsByCategory(category, filters = {}) {
		return await this.getAllDocuments({
			...filters,
			category
		})
	}


	async createDocument(documentData) {
		try {
			const newDocument = new libraryDocumentModel(documentData)
			const savedDocument = await newDocument.save()
			// xoa cache
			await redisService.releaseLock(`library:${documentData.subject.code}`)
			return {
				documentId: savedDocument._id,
				title: savedDocument.title,
				fileUrl: savedDocument.fileUrl,
				status: savedDocument.status
			}
		} catch (error) {
			throw new BadResponseError('Error creating document: ' + error.message)
		}
	}


	async bulkUploadDocuments(documents, files, userId) {
		const uploadedDocs = await Promise.all(
			files.map(async (file, index) => {
				try {
					return await this.createDocument(documents[index], file, userId)
				} catch (error) {
					console.error(`Error uploading document ${index}:`, error)
					return null
				}
			})
		)


		return uploadedDocs.filter(doc => doc !== null)
	}


	async updateDocument(documentId, updateData) {
		try {
			const document = await libraryDocumentModel.findById(documentId)
			if (!document) {
				throw new BadResponseError('Document not found')
			}

			const allowedUpdates = {
				title: updateData.title,
				description: updateData.description,
				status: updateData.status,
				printSettings: updateData.printSettings
			}

			// Object.keys(allowedUpdates).forEach(key =>
			// 	allowedUpdates[key] === undefined && delete allowedUpdates[key]
			// )
			const Updates = deleteUndefinedField(allowedUpdates)
			const updatedData = updateNestedObjectParser(Updates)

			const updatedDocument = await libraryDocumentModel.findOneAndUpdate(
				{ _id: new Types.ObjectId(documentId) },
				//{ $set: allowedUpdates },
				{ $set: updatedData },
				{ new: true }
			)
			// xoa cache
			await redisService.releaseLock(`library:${document.subject.code}`)
			return {
				documentId: updatedDocument._id,
				title: updatedDocument.title,
				status: updatedDocument.status,
				printSettings: updatedDocument.printSettings
			}
		} catch (error) {
			throw new BadResponseError('Error updating document: ' + error.message)
		}
	}


	async deleteDocument(documentId) {
		try {
			const document = await libraryDocumentModel.findById(documentId)
			if (!document) {
				throw new BadResponseError('Document not found')
			}


			const hasActivePrintJobs = await this.checkActivePrintJobs(documentId)
			if (hasActivePrintJobs) {
				throw new BadResponseError('Cannot delete document with active print jobs')
			}


			if (document.fileUrl) {
				const publicId = document.fileUrl.split('/').pop().split('.')[0]
				await cloudinary.uploader.destroy(`documents/${publicId}`, { resource_type: 'raw' })
			}


			if (document.previewUrl) {
				const previewId = document.previewUrl.split('/').pop().split('.')[0]
				await cloudinary.uploader.destroy(`previews/${previewId}`, { resource_type: 'raw' })
			}

			await document.deleteOne()
			// xoa cache
			await redisService.releaseLock(`library:${document.subject.code}`)
			return {
				documentId,
				message: 'Document deleted successfully'
			}
		} catch (error) {
			throw new BadResponseError('Error deleting document: ' + error.message)
		}
	}


	async updateDocumentStatus(documentId, status) {
		return await this.updateDocument(documentId, { status })
	}


	async getLibraryStats() {
		const stats = await libraryDocumentModel.aggregate([
			{
				$group: {
					_id: null,
					totalDocuments: { $sum: 1 },
					totalDownloads: { $sum: '$metadata.downloads' },
					totalPrints: { $sum: '$metadata.prints' },
					categoryCounts: {
						$push: {
							category: '$mainCategory',
							count: 1
						}
					}
				}
			}
		])

		return stats[0] || {
			totalDocuments: 0,
			totalDownloads: 0,
			totalPrints: 0,
			categoryCounts: []
		}
	}


	async getCategoryStructure() {
		const subjects = await SubjectModel.find().lean();


		const categoryStructure = {
			general: {
				name: CATEGORY_TRANSLATIONS.general,
				subjects: []
			},
			political: {
				name: CATEGORY_TRANSLATIONS.political,
				subjects: []
			},
			basic: {
				name: CATEGORY_TRANSLATIONS.basic,
				subjects: []
			},
			specialized: {
				name: CATEGORY_TRANSLATIONS.specialized,
				subjects: []
			}
		};

		subjects.forEach(subject => {
			categoryStructure[subject.category].subjects.push({
				...subject,
				categoryName: CATEGORY_TRANSLATIONS[subject.category]
			});
		});

		return categoryStructure;
	}


	async getDocumentPreview(documentId) {
		const document = await libraryDocumentModel.findById(documentId);
		if (!document) {
			throw new BadResponseError('Document not found');
		}


		await libraryDocumentModel.findByIdAndUpdate(
			documentId,
			{ $inc: { 'metadata.views': 1 } }
		);

		return {
			title: document.title,
			description: document.description,
			previewUrl: document.previewUrl,
			totalPages: document.totalPages,
			printSettings: document.printSettings
		};
	}

	async generatePreview(file) {

		return 'preview_url'
	}

	async getDocumentPageCount(filePath) {

		return 1
	}

	async checkActivePrintJobs(documentId) {
		return false
	}
}

export const libraryService = new LibraryService() 