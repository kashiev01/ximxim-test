import express from 'express';
import { deleteFileById, downloadFileById, getAllFiles, getFileById, uploadFile } from '../controllers/File';
import { upload } from '../middleware/multerStorage';
import { verifyToken } from '../middleware/jwtVerify';

const file_router = express.Router({ mergeParams: true });

file_router.post('/upload', verifyToken, upload.single('file'), uploadFile);
file_router.get('/list', verifyToken, getAllFiles);
file_router.delete('/delete/:id', verifyToken, deleteFileById);
file_router.get('/:id', verifyToken, getFileById);
file_router.get('/download/:id', verifyToken, downloadFileById);

export = file_router;
