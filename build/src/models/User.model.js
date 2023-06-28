"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../configs/dbConfig");
const bcrypt_1 = require("bcrypt");
const utils_1 = require("../utils/utils");
const sequelize = new dbConfig_1.DatabaseConfig().connectDB();
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'User'
});
User.addHook('beforeSave', async (user) => {
    if (!user.getDataValue('password'))
        return;
    const salt = await (0, bcrypt_1.genSalt)();
    const hashedPassword = await (0, utils_1.genHash)(user.getDataValue('password'), salt);
    user.setDataValue('password', hashedPassword);
});
