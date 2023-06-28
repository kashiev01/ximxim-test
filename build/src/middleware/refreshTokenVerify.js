"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRefreshToken = (req, res, next) => {
    const refresh_token = req.body.refresh;
    try {
        if (!refresh_token) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
        req.refreshUserId = decodedToken.userId;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
