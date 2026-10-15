import { testOracleConnection } from "./oracleService";

testOracleConnection()
  .then(() => {
    console.log("Oracle test completed");
  })
  .catch((error) => {
    console.error("Oracle connection failed:");
    console.error(error);
    process.exit(1);
  });