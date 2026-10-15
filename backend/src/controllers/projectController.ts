import { Response, NextFunction } from "express";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { success, failure } from "../utils/response";
import * as projectService from "../services/projectService";

export async function createProjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { name, language, description } = req.body;
    if (!name || !language) {
      failure(res, "name and language are required", 400);
      return;
    }
    const project = await projectService.createProject(new Types.ObjectId(req.userId), {
      name,
      language,
      description,
    });
    success(res, project, 201);
  } catch (err) {
    next(err);
  }
}

export async function listProjectsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const projects = await projectService.listProjectsForUser(new Types.ObjectId(req.userId));
    success(res, projects);
  } catch (err) {
    next(err);
  }
}

export async function getProjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProjectById(req.params.id, new Types.ObjectId(req.userId));
    if (!project) {
      failure(res, "Project not found", 404);
      return;
    }
    success(res, project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const project = await projectService.deleteProject(req.params.id, new Types.ObjectId(req.userId));
    if (!project) {
      failure(res, "Project not found", 404);
      return;
    }
    success(res, { deleted: true });
  } catch (err) {
    next(err);
  }
}
