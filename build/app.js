"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appConfig_1 = require("./src/configs/appConfig");
const dbConfig_1 = require("./src/configs/dbConfig");
const Auth_1 = __importDefault(require("./src/routes/Auth"));
const exception_handler_1 = require("./src/middleware/exception-handler");
const File_1 = __importDefault(require("./src/routes/File"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(Auth_1.default);
app.use('/file', File_1.default);
app.use(exception_handler_1.ExceptionHandler);
const appConfig = new appConfig_1.AppConfig().createServerConfig();
const sequelize = new dbConfig_1.DatabaseConfig().connectDB();
const StartServer = () => {
    sequelize.authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
    app.listen(appConfig.port);
    console.log(`Server is running on port ${appConfig.port}`);
};
StartServer();
