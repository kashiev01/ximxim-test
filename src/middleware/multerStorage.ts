import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
const mkdirAsync = promisify(fs.mkdir);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    await mkdirAsync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
