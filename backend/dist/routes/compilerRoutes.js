"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compilerController_1 = require("../controllers/compilerController");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const router = (0, express_1.Router)();
router.post("/run", rateLimitMiddleware_1.executionRateLimiter, compilerController_1.runController);
router.get("/languages", compilerController_1.languagesController);
exports.default = router;
//# sourceMappingURL=compilerRoutes.js.map