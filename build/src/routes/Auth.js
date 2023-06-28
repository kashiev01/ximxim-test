"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const jwtVerify_1 = require("../middleware/jwtVerify");
const refreshTokenVerify_1 = require("../middleware/refreshTokenVerify");
const auth_router = express_1.default.Router({ mergeParams: true });
auth_router.post("/signup", Auth_1.userSignUp);
auth_router.post("/signin", Auth_1.userLogin);
auth_router.get('/info', jwtVerify_1.verifyToken, Auth_1.getCurrentUserId);
auth_router.get('/signin/new_token', refreshTokenVerify_1.verifyRefreshToken, Auth_1.grantNewJWT);
auth_router.get('/logout', jwtVerify_1.verifyToken, Auth_1.logoutUser);
module.exports = auth_router;
