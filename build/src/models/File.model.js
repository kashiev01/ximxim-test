"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../configs/dbConfig");
const sequelize = new dbConfig_1.DatabaseConfig().connectDB();
class File extends sequelize_1.Model {
}
exports.File = File;
File.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    mime_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    extension: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize,
    modelName: 'File',
});
