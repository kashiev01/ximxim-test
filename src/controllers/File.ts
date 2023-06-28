import { Response, NextFunction } from 'express';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { File } from '../models/File.model';
import fs from 'fs';
import path from 'path';
import { CustomRequest } from '../middleware/interfaces/request.interface';
import { WhereOptions } from 'sequelize';
import { checkToken } from './Auth';

const folderPath = path.join(__dirname, '../../uploads');

dotenv.config();

export const uploadFile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];
    if (!req.file) {
      throw new Error('File not found. Please make sure you attached it');
    }
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      const { originalname, size, mimetype, encoding } = req.file;
      const saveFile = await File.create({
        name: originalname,
        size,
        mime_type: mimetype,
        extension: encoding,
      });
      res.send(saveFile);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const getAllFiles = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.list_size as string, 10) || 10;
  const offset = (page - 1) * limit;
  let check_token;
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      const files = await File.findAll({
        limit: limit,
        offset: offset,
        where: {},
      });
      res.send(files);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  let check_token;
  const token = req.headers.authorization?.split(' ')[1];
  const unlinkAsync = promisify(fs.unlink);
  const fileId = parseInt(req.params.id);

  try {
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      const file = await File.findByPk(fileId);
      if (!file) {
        throw new Error('File not found');
      }

      await file.destroy();

      await unlinkAsync(`${folderPath}/${file.name}`);
      res.send(`File with id=${fileId} was deleted`);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  let check_token;
  const token = req.headers.authorization?.split(' ')[1];
  const fileId = parseInt(req.params.id);

  try {
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      const file = await File.findByPk(fileId);
      if (!file) {
        throw new Error('Wrong file id');
      }

      res.send(file);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const downloadFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  let check_token;
  const token = req.headers.authorization?.split(' ')[1];
  const fileId = parseInt(req.params.id);
  try {
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      const file = await File.findByPk(fileId);
      if (!file) {
        throw new Error('File not found');
      }

      res.download(`${folderPath}/${file.name}`, file.name, (error) => {
        if (error) {
          res.send(error);
        }
      });
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const updateFileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const fileId = parseInt(req.params.id);
  let check_token;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      if (!req.file) {
        throw new Error('File not found. Please make sure you attached it');
      }

      const { originalname, size, mimetype, encoding } = req.file;
      const file = await File.findByPk(fileId);
      if (!file) {
        throw new Error('File not found');
      }
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(`${folderPath}/${file.name}`);

      const newFile = await File.update(
        { name: originalname, size, mime_type: mimetype, extension: encoding },
        { where: { id: fileId } as WhereOptions },
      );

      res.send(newFile);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};
