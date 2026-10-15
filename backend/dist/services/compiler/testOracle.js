"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oracleService_1 = require("./oracleService");
(0, oracleService_1.testOracleConnection)()
    .then(() => {
    console.log("Oracle test completed");
})
    .catch((error) => {
    console.error("Oracle connection failed:");
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=testOracle.js.map