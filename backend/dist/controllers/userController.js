"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meController = meController;
const User_1 = require("../models/User");
const response_1 = require("../utils/response");
async function meController(req, res, next) {
    try {
        const user = await User_1.User.findById(req.userId);
        if (!user) {
            (0, response_1.failure)(res, "User not found", 404);
            return;
        }
        (0, response_1.success)(res, { id: user.id, name: user.name, email: user.email });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=userController.js.map