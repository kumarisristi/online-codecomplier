"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlPool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.mysqlPool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT) || 3307,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "compiler",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
//# sourceMappingURL=mysql.js.map