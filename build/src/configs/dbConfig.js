"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
class DatabaseConfig {
    constructor() {
        this.port = process.env.MY_SQL_PORT || '';
        this.host = process.env.MY_SQL_HOST || '';
        this.username = process.env.DB_USERNAME || '';
        this.password = process.env.PASSWORD || '';
        this.db_name = process.env.DB_NAME || '';
    }
    connectDB() {
        const sequelize = new sequelize_1.Sequelize(this.db_name, this.username, this.password, {
            host: this.host,
            dialect: 'mysql',
            port: +this.port,
        });
        sequelize
            .sync()
            .then((result) => console.log('Tables are synced'))
            .catch((error) => console.log(error));
        return sequelize;
    }
}
exports.DatabaseConfig = DatabaseConfig;
