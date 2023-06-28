"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const File_1 = require("../controllers/File");
const multerStorage_1 = require("../middleware/multerStorage");
const jwtVerify_1 = require("../middleware/jwtVerify");
const file_router = express_1.default.Router({ mergeParams: true });
file_router.post('/upload', jwtVerify_1.verifyToken, multerStorage_1.upload.single('file'), File_1.uploadFile);
file_router.get('/list', jwtVerify_1.verifyToken, File_1.getAllFiles);
file_router.delete('/delete/:id', jwtVerify_1.verifyToken, File_1.deleteFileById);
file_router.get('/:id', jwtVerify_1.verifyToken, File_1.getFileById);
file_router.get('/download/:id', jwtVerify_1.verifyToken, File_1.downloadFileById);
file_router.put('/update/:id', jwtVerify_1.verifyToken, multerStorage_1.upload.single('file'), File_1.updateFileById);
module.exports = file_router;
