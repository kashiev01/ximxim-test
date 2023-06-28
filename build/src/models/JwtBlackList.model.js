"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtBlackList = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../configs/dbConfig");
const sequelize = new dbConfig_1.DatabaseConfig().connectDB();
class JwtBlackList extends sequelize_1.Model {
}
exports.JwtBlackList = JwtBlackList;
JwtBlackList.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    is_revoked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize,
    modelName: 'blacklist',
});
