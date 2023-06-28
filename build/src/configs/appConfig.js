"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AppConfig {
    constructor() {
        this.port = process.env.SERVER_PORT || "";
    }
    createServerConfig() {
        return {
            port: this.port,
        };
    }
}
exports.AppConfig = AppConfig;
