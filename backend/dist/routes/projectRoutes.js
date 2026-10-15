"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post("/", projectController_1.createProjectController);
router.get("/", projectController_1.listProjectsController);
router.get("/:id", projectController_1.getProjectController);
router.delete("/:id", projectController_1.deleteProjectController);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map