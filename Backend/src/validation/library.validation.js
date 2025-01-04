import Joi from 'joi'
import { UnprocessableError } from '~/cores/error.response'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createDocument = async (req, res, next) => {
	try {

		if (!req.file) {
			throw new UnprocessableError('Document file is required')
		}

		const allowedTypes = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'text/plain'
		]

		if (!allowedTypes.includes(req.file.mimetype)) {
			throw new UnprocessableError('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.')
		}


		const documentData = {
			title: req.body.title,
			description: req.body.description,
			subject: {
				code: req.body.subjectCode,
				name: req.body.subjectName,
				category: req.body.subjectCategory
			},
			documentType: req.body.documentType,
			semester: req.body.semester,
			fileName: req.file.originalname,
			fileType: req.file.mimetype,
			fileUrl: req.file.path, // Cloudinary URL
			previewUrl: req.file.path,
			totalPages: 1,
			printSettings: {
				allowedPaperSizes: Array.isArray(req.body.allowedPaperSizes)
					? req.body.allowedPaperSizes
					: [req.body.allowedPaperSizes],
				costPerPage: Number(req.body.costPerPage),
				allowColor: req.body.allowColor === 'true',
				maxCopies: Number(req.body.maxCopies) || 10,
				doubleSidedAllowed: req.body.doubleSidedAllowed !== 'false'
			}
		}

		const schema = Joi.object({
			title: Joi.string().required(),
			description: Joi.string(),
			subject: Joi.object({
				code: Joi.string().required(),
				name: Joi.string().required(),
				category: Joi.string().valid('general', 'political', 'basic', 'specialized').required()
			}).required(),
			documentType: Joi.string().valid('theory', 'exam').required(),
			semester: Joi.string().required(),
			printSettings: Joi.object({
				allowedPaperSizes: Joi.array().items(
					Joi.string().valid('A4', 'A3', 'A2', 'A1')
				).required().min(1),
				allowColor: Joi.boolean(),
				maxCopies: Joi.number().integer().min(1),
				costPerPage: Joi.number().required().min(0),
				doubleSidedAllowed: Joi.boolean()
			}).required()
		});

		const { error } = schema.validate(documentData, {
			abortEarly: false,
			stripUnknown: true
		});

		if (error) {
			throw new UnprocessableError(error.details.map(d => d.message).join('. '));
		}

		req.body = documentData;
		next();
	} catch (error) {
		throw new UnprocessableError(error.message || 'Invalid document data');
	}
}

const updateDocument = async (req, res, next) => {
	const schema = Joi.object({
		documentId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
		title: Joi.string(),
		description: Joi.string(),
		status: Joi.string().valid('active', 'inactive', 'archived'),
		printSettings: Joi.object({
			allowedPaperSizes: Joi.array().items(
				Joi.string().valid('A4', 'A3', 'A2', 'A1')
			),
			allowColor: Joi.boolean(),
			maxCopies: Joi.number().integer().min(1),
			costPerPage: Joi.number().min(0),
			doubleSidedAllowed: Joi.boolean()
		})
	})

	try {
		await schema.validateAsync({ ...req.body, documentId: req.params.documentId })
		next()
	} catch (error) {
		throw new UnprocessableError('Invalid update data')
	}
}

const deleteDocument = async (req, res, next) => {
	const schema = Joi.object({
		documentId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
	})

	try {
		await schema.validateAsync({ documentId: req.params.documentId })
		next()
	} catch (error) {
		throw new UnprocessableError('Invalid document ID')
	}
}

export const libraryValidation = {
	createDocument,
	updateDocument,
	deleteDocument
} 