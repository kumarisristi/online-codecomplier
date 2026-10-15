import { Router } from "express";
import {
  createProjectController,
  listProjectsController,
  getProjectController,
  deleteProjectController,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.post("/", createProjectController);
router.get("/", listProjectsController);
router.get("/:id", getProjectController);
router.delete("/:id", deleteProjectController);

export default router;
