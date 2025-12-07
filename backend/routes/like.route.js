
import express from "express";

import {
    likePost, unlikePost
} from "../controllers/like.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/like", authMiddleware, likePost);
router.post("/unlike", authMiddleware, unlikePost);

export default router;