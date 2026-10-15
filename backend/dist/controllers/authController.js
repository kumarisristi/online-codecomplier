"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
function signToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.jwtSecret, { expiresIn: env_1.env.jwtExpiresIn });
}
async function registerController(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            (0, response_1.failure)(res, "name, email and password are required", 400);
            return;
        }
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            (0, response_1.failure)(res, "Email already in use", 409);
            return;
        }
        const user = await User_1.User.create({ name, email, password });
        const token = signToken(user.id);
        (0, response_1.success)(res, { token, user: { id: user.id, name: user.name, email: user.email } }, 201);
    }
    catch (err) {
        next(err);
    }
}
async function loginController(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            (0, response_1.failure)(res, "email and password are required", 400);
            return;
        }
        const user = await User_1.User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            (0, response_1.failure)(res, "Invalid credentials", 401);
            return;
        }
        const token = signToken(user.id);
        (0, response_1.success)(res, { token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=authController.js.map