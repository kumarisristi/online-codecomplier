"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOracleConnection = testOracleConnection;
exports.executePLSQL = executePLSQL;
const oracledb_1 = __importDefault(require("oracledb"));
const ORACLE_CONFIG = {
    user: process.env.ORACLE_USER || "compiler",
    password: process.env.ORACLE_PASSWORD || "Compiler123",
    connectString: process.env.ORACLE_CONNECT_STRING || "localhost:1521/FREEPDB1",
};
async function testOracleConnection() {
    let connection;
    try {
        connection = await oracledb_1.default.getConnection(ORACLE_CONFIG);
        const result = await connection.execute("SELECT BANNER AS VERSION FROM V$VERSION WHERE ROWNUM = 1");
        console.log("Oracle connected successfully");
        console.log(result.rows);
    }
    finally {
        if (connection) {
            await connection.close();
        }
    }
}
async function executePLSQL(code) {
    let connection;
    try {
        connection = await oracledb_1.default.getConnection(ORACLE_CONFIG);
        // Enable DBMS_OUTPUT
        await connection.execute(`
      BEGIN
        DBMS_OUTPUT.ENABLE(NULL);
      END;
    `);
        // Execute user's PL/SQL
        const plsqlCode = code
            .trim()
            .replace(/^\s*\/\s*$/gm, "")
            .trim();
        await connection.execute(plsqlCode);
        // Read DBMS_OUTPUT
        const result = await connection.execute(`
      BEGIN
        DBMS_OUTPUT.GET_LINES(:lines, :numlines);
      END;
      `, {
            lines: {
                dir: oracledb_1.default.BIND_OUT,
                type: oracledb_1.default.STRING,
                maxArraySize: 1000,
                maxSize: 32767,
            },
            numlines: {
                dir: oracledb_1.default.BIND_INOUT,
                type: oracledb_1.default.NUMBER,
                val: 1000,
            },
        });
        const output = result.outBinds;
        return {
            stdout: (output.lines || []).filter(Boolean).join("\n"),
            stderr: "",
            exitCode: 0,
        };
    }
    catch (error) {
        return {
            stdout: "",
            stderr: error?.message || String(error),
            exitCode: 1,
        };
    }
    finally {
        if (connection) {
            await connection.close().catch(() => { });
        }
    }
}
//# sourceMappingURL=oracleService.js.map