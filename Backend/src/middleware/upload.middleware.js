//src/middleware/upload.middleware.js

import multer from 'multer'
import { BadResponseError } from '~/cores/error.response.js'
import { storage } from '~/config/cloudinary.config.js'

// Configure file filter
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'application/pdf' ||
		file.mimetype === 'application/msword' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		file.mimetype === 'text/plain') {
		cb(null, true)
	} else {
		cb(new BadResponseError('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false)
	}
}

// Create multer instance with Cloudinary storage
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 50 * 1024 * 1024 // 50MB limit
	}
})

export { upload }

export const uploadMiddleware = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 50 * 1024 * 1024 // 50MB 
	}
}).single('documentFile')