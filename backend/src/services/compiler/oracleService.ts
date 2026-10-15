import oracledb from "oracledb";

const ORACLE_CONFIG = {
  user: process.env.ORACLE_USER || "compiler",
  password: process.env.ORACLE_PASSWORD || "Compiler123",
  connectString:
    process.env.ORACLE_CONNECT_STRING || "localhost:1521/FREEPDB1",
};

export async function testOracleConnection(): Promise<void> {
  let connection: oracledb.Connection | undefined;

  try {
    connection = await oracledb.getConnection(ORACLE_CONFIG);

    const result = await connection.execute<{ VERSION: string }>(
      "SELECT BANNER AS VERSION FROM V$VERSION WHERE ROWNUM = 1"
    );

    console.log("Oracle connected successfully");
    console.log(result.rows);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export async function executePLSQL(code: string) {
  let connection: oracledb.Connection | undefined;

  try {
    connection = await oracledb.getConnection(ORACLE_CONFIG);

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
    const result = await connection.execute<{
      lines: string[];
      numlines: number;
    }>(
      `
      BEGIN
        DBMS_OUTPUT.GET_LINES(:lines, :numlines);
      END;
      `,
      {
        lines: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxArraySize: 1000,
          maxSize: 32767,
        },
        numlines: {
          dir: oracledb.BIND_INOUT,
          type: oracledb.NUMBER,
          val: 1000,
        },
      }
    );

    const output = result.outBinds as {
      lines?: string[];
      numlines?: number;
    };

    return {
      stdout: (output.lines || []).filter(Boolean).join("\n"),
      stderr: "",
      exitCode: 0,
    };
  } catch (error: any) {
    return {
      stdout: "",
      stderr: error?.message || String(error),
      exitCode: 1,
    };
  } finally {
    if (connection) {
      await connection.close().catch(() => {});
    }
  }
}