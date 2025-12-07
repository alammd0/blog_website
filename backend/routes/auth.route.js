import express from "express";

import {
    register, login, getUser, getAllUsers, sendForgetPasswordLink, updatePassword
} from "../controllers/auth.controller.js";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.get("/me", authMiddleware, getUser);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.post("/forget-password", sendForgetPasswordLink);

// TODO: add middleware for User
router.post("/update-password/:token", updatePassword);

export default router;