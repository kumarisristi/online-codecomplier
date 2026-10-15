import { Router } from "express";
import { meController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, meController);

export default router;
