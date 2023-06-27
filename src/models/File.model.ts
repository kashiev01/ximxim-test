import { DataTypes, Model } from 'sequelize';
import { DatabaseConfig } from '../configs/dbConfig';
import { IFileModel } from './interfaces/file-model.interface';

const sequelize = new DatabaseConfig().connectDB();

export class File extends Model<IFileModel> {
  declare name: string;
  declare mime_type: string;
  declare size: number;
  declare extension: string;
}

File.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'File',
  },
);
