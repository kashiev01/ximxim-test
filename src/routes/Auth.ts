import express from "express";
import { getCurrentUserId, grantNewJWT, logoutUser, userLogin, userSignUp } from '../controllers/Auth';
import { verifyToken } from '../middleware/jwtVerify';
import { verifyRefreshToken } from '../middleware/refreshTokenVerify';

const auth_router = express.Router({ mergeParams: true });

auth_router.post("/signup", userSignUp);
auth_router.post("/signin", userLogin);
auth_router.get('/info', verifyToken, getCurrentUserId);
auth_router.get('/signin/new_token', verifyRefreshToken, grantNewJWT);
auth_router.get('/logout', verifyToken, logoutUser);



export = auth_router;
