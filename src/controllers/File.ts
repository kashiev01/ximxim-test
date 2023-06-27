import { Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { File } from '../models/File.model';
import fs from 'fs';
import path from 'path';
import { CustomRequest } from '../middleware/interfaces/request.interface';
import { error } from 'console';
const folderPath = path.join(__dirname, '../../uploads');

dotenv.config();

export const uploadFile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  if (!req.file) {
    throw new Error('File not found. Please make sure you attached it');
  }
  const { originalname, size, mimetype, encoding } = req.file;

  try {
    const saveFile = await File.create({
      name: originalname,
      size,
      mime_type: mimetype,
      extension: encoding,
    });
    res.send(saveFile);
  } catch (error) {
    next(error);
  }
};

export const getAllFiles = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.list_size as string, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const files = await File.findAll({
      limit: limit,
      offset: offset,
      where: {},
    });
    res.send(files);
  } catch (error) {
    next(error);
  }
};

export const deleteFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const unlinkAsync = promisify(fs.unlink);
  console.log(folderPath);
  const fileId = parseInt(req.params.id);

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      throw new Error('Wrong file id');
    }

    await file.destroy();

    await unlinkAsync(`${folderPath}/${file.name}`);
    res.send(`File with id=${fileId} was deleted`);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const fileId = parseInt(req.params.id);

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      throw new Error('Wrong file id');
    }

    res.send(file);
  } catch (error) {
    next(error);
  }
};

export const downloadFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const fileId = parseInt(req.params.id);
  try {
    console.log(123);
    const file = await File.findByPk(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    res.download(folderPath, `${file.name}`, (error) => {
      if (error) {
        res.send(error);
      }
    });
  } catch (error) {
    next(error);
  }
};
