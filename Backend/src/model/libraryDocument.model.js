import mongoose from "mongoose"
const { Schema, model } = mongoose

const DATABASE_NAME = 'LibraryDocument'
const COLLECTION_NAME = 'LibraryDocuments'

const subjectSchema = new Schema({
	code: {
		type: String,
		required: true,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: ['general', 'political', 'basic', 'specialized'],
		required: true
	},
	description: String
}, { _id: false });

export const SubjectModel = model('Subject', subjectSchema);

const libraryDocumentSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		index: true
	},
	description: {
		type: String,
	},
	subject: {
		type: subjectSchema,
		required: true,
		index: true
	},
	documentType: {
		type: String,
		enum: ['theory', 'exam'],
		required: true,
		index: true
	},
	semester: {
		type: String,
		required: true,
		index: true
	},
	fileName: {
		type: String,
		required: true
	},
	fileType: {
		type: String,
		required: true,
		enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
	},
	fileUrl: {
		type: String,
		required: true
	},
	previewUrl: {
		type: String,
		required: true
	},
	totalPages: {
		type: Number,
		required: true
	},
	uploadedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		enum: ['active', 'inactive', 'archived'],
		default: 'active'
	},
	printSettings: {
		allowedPaperSizes: [{
			type: String,
			enum: ['A4', 'A3', 'A2', 'A1']
		}],
		allowColor: {
			type: Boolean,
			default: false
		},
		maxCopies: {
			type: Number,
			default: 10
		},
		costPerPage: {
			type: Number,
			required: true
		},
		doubleSidedAllowed: {
			type: Boolean,
			default: true
		}
	},
	metadata: {
		downloads: {
			type: Number,
			default: 0
		},
		prints: {
			type: Number,
			default: 0
		},
		lastPrintedAt: Date,
		lastDownloadedAt: Date,
		views: {
			type: Number,
			default: 0
		}
	}
}, {
	collection: COLLECTION_NAME,
	timestamps: true
});

libraryDocumentSchema.index({ 'subject.category': 1, 'subject.code': 1, documentType: 1 });
libraryDocumentSchema.index({ status: 1, createdAt: -1 });

export const libraryDocumentModel = model(DATABASE_NAME, libraryDocumentSchema); 