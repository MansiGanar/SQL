import pg from "pg";

const { Pool } = pg;

const pool = new Pool();

export const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows[0]);
    console.log("Database connection is successful");
  } catch (error) {
    console.log(error.message);
    console.log("Query failed , error");
  }
};

export default pool;
