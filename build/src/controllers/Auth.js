"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.logoutUser = exports.grantNewJWT = exports.getCurrentUserId = exports.userLogin = exports.userSignUp = void 0;
const User_model_1 = require("../models/User.model");
const utils_1 = require("../utils/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtBlackList_model_1 = require("../models/JwtBlackList.model");
dotenv_1.default.config();
const userSignUp = async (req, res, next) => {
    const { id } = req.body;
    try {
        const user = await User_model_1.User.findOne({ where: { id } });
        if (user) {
            throw new Error('This user already exists');
        }
        const newUser = await User_model_1.User.create({ ...req.body });
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
};
exports.userSignUp = userSignUp;
const userLogin = async (req, res, next) => {
    const { id, password } = req.body;
    try {
        const user = await User_model_1.User.findOne({ where: { id } });
        if (!user) {
            throw new Error('Invalid id');
        }
        const isMatch = await (0, utils_1.compareHash)(password, user.password);
        if (!isMatch) {
            throw new Error('Password not correct');
        }
        const access_token = jsonwebtoken_1.default.sign({ userId: user?.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user?.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXP });
        res.status(200).json({
            success: true,
            access_token,
            refreshToken,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userLogin = userLogin;
const getCurrentUserId = async (req, res, next) => {
    try {
        let check_token;
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            check_token = await (0, exports.checkToken)(token);
        }
        if (check_token) {
            res.send(`Your id is: ${req.userId}`);
        }
        else {
            throw new Error('Your token access_token is revoked');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentUserId = getCurrentUserId;
const grantNewJWT = async (req, res, next) => {
    try {
        const userId = req.refreshUserId;
        const access_token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP,
        });
        res.status(200).json({
            success: true,
            access_token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.grantNewJWT = grantNewJWT;
const logoutUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const a = await JwtBlackList_model_1.JwtBlackList.findOne({ where: { token } });
        if (!token) {
            throw new Error('No access_token provided');
        }
        await JwtBlackList_model_1.JwtBlackList.create({ token, is_revoked: true });
        res.send('You are logged out');
    }
    catch (error) {
        next(error);
    }
};
exports.logoutUser = logoutUser;
const checkToken = async (token) => {
    const expired_token = await JwtBlackList_model_1.JwtBlackList.findOne({ where: { token } });
    if (!expired_token) {
        return true;
    }
    return false;
};
exports.checkToken = checkToken;
