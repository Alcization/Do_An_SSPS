import express from 'express'
import { libraryController } from '../controller/library.controller.js'
import { authentication, checkRoleAdmin } from '~/utils/authUtils.js'
import { upload } from '../middleware/upload.middleware.js'
import { handlerError } from '~/utils/handlerError.js'
import { libraryValidation } from '~/validation/library.validation.js'

const libraryRouter = express.Router()



libraryRouter.get('/categories', handlerError(libraryController.getCategories))
libraryRouter.get('/subjects', handlerError(libraryController.getSubjects))
libraryRouter.get('/structure', handlerError(libraryController.getCategoryStructure))

libraryRouter.use(authentication);
libraryRouter.get('/', handlerError(libraryController.getAllDocuments));
libraryRouter.get('/getByAdmin', handlerError(libraryController.getAllDocumentsByAdmin));
libraryRouter.get('/search', handlerError(libraryController.searchDocuments));
libraryRouter.get('/:documentId', handlerError(libraryController.getDocumentById));
libraryRouter.post('/:documentId/print', handlerError(libraryController.createPrintRequest))
libraryRouter.get('/subject/:subjectCode/documents', handlerError(libraryController.getDocumentsBySubject));
libraryRouter.get('/category/:category', handlerError(libraryController.getDocumentsByCategory));
libraryRouter.get('/document/:documentId/preview', handlerError(libraryController.getDocumentPreview));


libraryRouter.use(checkRoleAdmin);

libraryRouter.post('/',
	upload.single('file'),
	handlerError(libraryValidation.createDocument),
	handlerError(libraryController.createDocument)
);
// libraryRouter.patch('/:documentId',
// 	handlerError(libraryValidation.updateDocument),
// 	handlerError(libraryController.updateDocument)
// );
libraryRouter.patch('/:documentId',
	upload.single('file'),
	handlerError(libraryController.updateDocument)
);
libraryRouter.delete('/:documentId',
	handlerError(libraryValidation.deleteDocument),
	handlerError(libraryController.deleteDocument)
)
libraryRouter.get('/stats', handlerError(libraryController.getLibraryStats));
libraryRouter.post('/bulk-upload', upload.array('files'), handlerError(libraryController.bulkUploadDocuments));
libraryRouter.patch('/:documentId/status', handlerError(libraryController.updateDocumentStatus));

export default libraryRouter 