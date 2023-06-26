import { DataTypes } from "sequelize";
import { DatabaseConfig } from '../configs/dbConfig';
import { genSalt } from 'bcrypt';
import { genHash } from '../utils/utils';

const sequelize = new DatabaseConfig().connectDB();

export const User = sequelize.define("user", {
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
});

User.addHook('beforeSave', async (user) => {
    if (!user.getDataValue('password')) return;
    const salt = await genSalt();
    const hashedPassword = await genHash(user.getDataValue('password'), salt);
    user.setDataValue('password', hashedPassword);
});
