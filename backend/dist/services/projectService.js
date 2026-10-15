"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.listProjectsForUser = listProjectsForUser;
exports.getProjectById = getProjectById;
exports.deleteProject = deleteProject;
const Project_1 = require("../models/Project");
const File_1 = require("../models/File");
async function createProject(owner, data) {
    return Project_1.Project.create({ ...data, owner });
}
async function listProjectsForUser(owner) {
    return Project_1.Project.find({ owner }).sort({ updatedAt: -1 });
}
async function getProjectById(id, owner) {
    return Project_1.Project.findOne({ _id: id, owner });
}
async function deleteProject(id, owner) {
    const project = await Project_1.Project.findOneAndDelete({ _id: id, owner });
    if (project) {
        await File_1.File.deleteMany({ project: project._id });
    }
    return project;
}
//# sourceMappingURL=projectService.js.map