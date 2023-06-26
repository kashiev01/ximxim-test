import express from "express";
import { userSignUp } from '../controllers/Auth';

const auth_router = express.Router({ mergeParams: true });

auth_router.post("/signup", userSignUp);
// router.post("/login", controller.loginUser);
export = auth_router;
