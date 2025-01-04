import { libraryService } from '~/service/library.service.js'
import { CreatedResponse, OKReponse } from '~/cores/sucess.response.js'
import { BadResponseError } from '~/cores/error.response.js'

class LibraryController {
	constructor() {
		this.getCategories = this.getCategories.bind(this)
		this.getSubjects = this.getSubjects.bind(this)
		this.getAllDocuments = this.getAllDocuments.bind(this)
		this.getAllDocumentsByAdmin = this.getAllDocumentsByAdmin.bind(this)
		this.searchDocuments = this.searchDocuments.bind(this)
		this.getDocumentById = this.getDocumentById.bind(this)
		this.getDocumentsBySubject = this.getDocumentsBySubject.bind(this)
		this.getDocumentsByCategory = this.getDocumentsByCategory.bind(this)
		this.createDocument = this.createDocument.bind(this)
		this.bulkUploadDocuments = this.bulkUploadDocuments.bind(this)
		this.updateDocument = this.updateDocument.bind(this)
		this.deleteDocument = this.deleteDocument.bind(this)
		this.updateDocumentStatus = this.updateDocumentStatus.bind(this)
		this.getLibraryStats = this.getLibraryStats.bind(this)
		this.getCategoryStructure = this.getCategoryStructure.bind(this)
		this.getDocumentPreview = this.getDocumentPreview.bind(this)
	}

	async getCategories(req, res) {
		const result = await libraryService.getCategories()
		new OKReponse({
			message: 'Get categories successfully',
			metaData: result
		}).send(res)
	}

	async getAllDocumentsByAdmin(req, res) {
		const result = await libraryService.getAllDocumentsByAdmin()
		new OKReponse({
			message: 'Get categories successfully',
			metaData: result
		}).send(res)
	}

	async getSubjects(req, res) {
		const result = await libraryService.getSubjects()
		new OKReponse({
			message: 'Get subjects successfully',
			metaData: result
		}).send(res)
	}

	async getAllDocuments(req, res) {
		const result = await libraryService.getAllDocuments(req.query)
		new OKReponse({
			message: 'Get documents successfully',
			metaData: result
		}).send(res)
	}

	async searchDocuments(req, res) {
		const result = await libraryService.searchDocuments(req.query)
		new OKReponse({
			message: 'Search documents successfully',
			metaData: result
		}).send(res)
	}

	async getDocumentById(req, res) {
		const result = await libraryService.getDocumentById(req.params.documentId)
		new OKReponse({
			message: 'Get document successfully',
			metaData: result
		}).send(res)
	}

	async getDocumentsBySubject(req, res) {
		const { subjectCode } = req.params;
		const { documentType } = req.query;

		// const result = await libraryService.getDocumentsBySubject(subjectCode, { documentType });
		const result = await libraryService.getDocumentsBySubjectRedis(subjectCode, { documentType });
		new OKReponse({
			message: 'Get documents by subject successfully',
			metaData: result
		}).send(res);
	}

	async getDocumentsByCategory(req, res) {
		const result = await libraryService.getDocumentsByCategory(
			req.params.category,
			req.query
		)
		new OKReponse({
			message: 'Get documents by category successfully',
			metaData: result
		}).send(res)
	}

	async createDocument(req, res) {
		const documentData = {
			...req.body,
			uploadedBy: req.user.userId,
			fileName: req.file.originalname,
			fileType: req.file.mimetype,
			fileUrl: req.file.path,
			previewUrl: req.file.path,
			totalPages: 1,
			status: 'active'
		};

		const result = await libraryService.createDocument(documentData);

		new CreatedResponse({
			message: 'Document created successfully',
			metaData: result
		}).send(res);
	}

	async bulkUploadDocuments(req, res) {
		if (!req.files || req.files.length === 0) {
			throw new BadResponseError('No files uploaded')
		}

		const result = await libraryService.bulkUploadDocuments(
			req.body.documents,
			req.files,
			req.user.userId
		)
		new CreatedResponse({
			message: 'Documents uploaded successfully',
			metaData: result
		}).send(res)
	}

	async updateDocument(req, res) {
		const result = await libraryService.updateDocument(
			req.params.documentId,
			req.body
		)
		new OKReponse({
			message: 'Document updated successfully',
			metaData: result
		}).send(res)

	}

	async deleteDocument(req, res) {
		const result = await libraryService.deleteDocument(req.params.documentId)
		new OKReponse({
			message: 'Document deleted successfully',
			metaData: result
		}).send(res)
	}

	async updateDocumentStatus(req, res) {
		const result = await libraryService.updateDocumentStatus(
			req.params.documentId,
			req.body.status
		)
		new OKReponse({
			message: 'Document status updated successfully',
			metaData: result
		}).send(res)
	}

	async getLibraryStats(req, res) {
		const result = await libraryService.getLibraryStats()
		new OKReponse({
			message: 'Get library statistics successfully',
			metaData: result
		}).send(res)
	}

	async getCategoryStructure(req, res) {
		const result = await libraryService.getCategoryStructure();
		new OKReponse({
			message: 'Get category structure successfully',
			metaData: result
		}).send(res);
	}

	async getDocumentPreview(req, res) {
		const result = await libraryService.getDocumentPreview(req.params.documentId);
		new OKReponse({
			message: 'Get document preview successfully',
			metaData: result
		}).send(res);
	}
}

export const libraryController = new LibraryController() 