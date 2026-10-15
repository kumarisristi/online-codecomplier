"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectController = createProjectController;
exports.listProjectsController = listProjectsController;
exports.getProjectController = getProjectController;
exports.deleteProjectController = deleteProjectController;
const mongoose_1 = require("mongoose");
const response_1 = require("../utils/response");
const projectService = __importStar(require("../services/projectService"));
async function createProjectController(req, res, next) {
    try {
        const { name, language, description } = req.body;
        if (!name || !language) {
            (0, response_1.failure)(res, "name and language are required", 400);
            return;
        }
        const project = await projectService.createProject(new mongoose_1.Types.ObjectId(req.userId), {
            name,
            language,
            description,
        });
        (0, response_1.success)(res, project, 201);
    }
    catch (err) {
        next(err);
    }
}
async function listProjectsController(req, res, next) {
    try {
        const projects = await projectService.listProjectsForUser(new mongoose_1.Types.ObjectId(req.userId));
        (0, response_1.success)(res, projects);
    }
    catch (err) {
        next(err);
    }
}
async function getProjectController(req, res, next) {
    try {
        const project = await projectService.getProjectById(req.params.id, new mongoose_1.Types.ObjectId(req.userId));
        if (!project) {
            (0, response_1.failure)(res, "Project not found", 404);
            return;
        }
        (0, response_1.success)(res, project);
    }
    catch (err) {
        next(err);
    }
}
async function deleteProjectController(req, res, next) {
    try {
        const project = await projectService.deleteProject(req.params.id, new mongoose_1.Types.ObjectId(req.userId));
        if (!project) {
            (0, response_1.failure)(res, "Project not found", 404);
            return;
        }
        (0, response_1.success)(res, { deleted: true });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=projectController.js.map