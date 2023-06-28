import { DataTypes, Model } from 'sequelize';
import { DatabaseConfig } from '../configs/dbConfig';
import { IJwtBlackListModel } from './interfaces/jwt-black-list.interface';

const sequelize = new DatabaseConfig().connectDB();

export class JwtBlackList extends Model<IJwtBlackListModel> {
  declare token: string;
  declare is_revoked: boolean;
}

JwtBlackList.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    is_revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'blacklist',
  },
);
