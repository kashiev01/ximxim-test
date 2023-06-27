import { DataTypes, Model } from "sequelize";
import { DatabaseConfig } from '../configs/dbConfig';
import { genSalt } from 'bcrypt';
import { genHash } from '../utils/utils';
import { IUserModel } from './interfaces/user-model.interface';

const sequelize = new DatabaseConfig().connectDB();

export class User extends Model<IUserModel> {
    declare id: string;
    declare password: string
} 

User.init({
    id: {
		type: DataTypes.STRING,
		allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
         validate: {
            notEmpty: true
        }
	}
 }, {
    sequelize, 
    modelName: 'User'
 })

User.addHook('beforeSave', async (user) => {
    if (!user.getDataValue('password')) return;
    const salt = await genSalt();
    const hashedPassword = await genHash(user.getDataValue('password'), salt);
    user.setDataValue('password', hashedPassword);
});
