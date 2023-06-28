"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFileById = exports.downloadFileById = exports.getFileById = exports.deleteFileById = exports.getAllFiles = exports.uploadFile = void 0;
const util_1 = require("util");
const dotenv_1 = __importDefault(require("dotenv"));
const File_model_1 = require("../models/File.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Auth_1 = require("./Auth");
const folderPath = path_1.default.join(__dirname, '../../uploads');
dotenv_1.default.config();
const uploadFile = async (req, res, next) => {
    try {
        let check_token;
        const token = req.headers.authorization?.split(' ')[1];
        if (!req.file) {
            throw new Error('File not found. Please make sure you attached it');
        }
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            const { originalname, size, mimetype, encoding } = req.file;
            const saveFile = await File_model_1.File.create({
                name: originalname,
                size,
                mime_type: mimetype,
                extension: encoding,
            });
            res.send(saveFile);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.uploadFile = uploadFile;
const getAllFiles = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.list_size, 10) || 10;
    const offset = (page - 1) * limit;
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            const files = await File_model_1.File.findAll({
                limit: limit,
                offset: offset,
                where: {},
            });
            res.send(files);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAllFiles = getAllFiles;
const deleteFileById = async (req, res, next) => {
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
    const fileId = parseInt(req.params.id);
    try {
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            const file = await File_model_1.File.findByPk(fileId);
            if (!file) {
                throw new Error('File not found');
            }
            await file.destroy();
            await unlinkAsync(`${folderPath}/${file.name}`);
            res.send(`File with id=${fileId} was deleted`);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFileById = deleteFileById;
const getFileById = async (req, res, next) => {
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    const fileId = parseInt(req.params.id);
    try {
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            const file = await File_model_1.File.findByPk(fileId);
            if (!file) {
                throw new Error('Wrong file id');
            }
            res.send(file);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getFileById = getFileById;
const downloadFileById = async (req, res, next) => {
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    const fileId = parseInt(req.params.id);
    try {
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            const file = await File_model_1.File.findByPk(fileId);
            if (!file) {
                throw new Error('File not found');
            }
            res.download(`${folderPath}/${file.name}`, file.name, (error) => {
                if (error) {
                    res.send(error);
                }
            });
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.downloadFileById = downloadFileById;
const updateFileById = async (req, res, next) => {
    const fileId = parseInt(req.params.id);
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (token) {
            check_token = await (0, Auth_1.checkToken)(token);
        }
        if (check_token) {
            if (!req.file) {
                throw new Error('File not found. Please make sure you attached it');
            }
            const { originalname, size, mimetype, encoding } = req.file;
            const file = await File_model_1.File.findByPk(fileId);
            if (!file) {
                throw new Error('File not found');
            }
            const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
            await unlinkAsync(`${folderPath}/${file.name}`);
            const newFile = await File_model_1.File.update({ name: originalname, size, mime_type: mimetype, extension: encoding }, { where: { id: fileId } });
            res.send(newFile);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateFileById = updateFileById;
