import { Project, IProject } from "../models/Project";
import { File } from "../models/File";
import { Types } from "mongoose";

export async function createProject(
  owner: Types.ObjectId,
  data: { name: string; language: string; description?: string }
): Promise<IProject> {
  return Project.create({ ...data, owner });
}

export async function listProjectsForUser(owner: Types.ObjectId) {
  return Project.find({ owner }).sort({ updatedAt: -1 });
}

export async function getProjectById(id: string, owner: Types.ObjectId) {
  return Project.findOne({ _id: id, owner });
}

export async function deleteProject(id: string, owner: Types.ObjectId) {
  const project = await Project.findOneAndDelete({ _id: id, owner });
  if (project) {
    await File.deleteMany({ project: project._id });
  }
  return project;
}
