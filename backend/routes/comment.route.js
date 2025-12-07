import express from "express";

import {
    createComment, updateComment, deleteComment, getAllComments, hideComment
} from "../controllers/comment.controller.js";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.put("/update/:id", authMiddleware, updateComment);
router.delete("/delete/:id", authMiddleware, deleteComment);
router.get("/all", authMiddleware, getAllComments);
router.post("/hide/:id", authMiddleware, adminMiddleware, hideComment);

export default router;