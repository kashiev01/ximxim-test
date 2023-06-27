import express from "express";
import { userLogin, userSignUp } from '../controllers/Auth';

const auth_router = express.Router({ mergeParams: true });

auth_router.post("/signup", userSignUp);
auth_router.post("/signin", userLogin);
export = auth_router;
