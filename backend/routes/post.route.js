import express from "express";
import upload from "../config/multer.js";

import {
    createPost, updatePost, deletePost, getAllPosts, listPosts, getPost
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createPost);
router.put("/update/:id", authMiddleware, upload.single("image"), updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);
router.get("/all", authMiddleware, getAllPosts);
router.get('/list', authMiddleware, listPosts);
router.get("/:id", authMiddleware, getPost);

export default router;