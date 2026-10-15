import api from "./api";
import { Project } from "../types/project";

export async function listProjects(): Promise<Project[]> {
  const { data } = await api.get("/projects");
  return data.data as Project[];
}

export async function createProject(payload: { name: string; language: string; description?: string }): Promise<Project> {
  const { data } = await api.post("/projects", payload);
  return data.data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
