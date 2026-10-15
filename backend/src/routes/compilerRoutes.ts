import { Router } from "express";
import { runController, languagesController } from "../controllers/compilerController";
import { executionRateLimiter } from "../middleware/rateLimitMiddleware";

const router = Router();

router.post("/run", executionRateLimiter, runController);
router.get("/languages", languagesController);

export default router;
