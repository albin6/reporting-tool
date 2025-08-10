import { Pool } from "pg";
import { env } from "./env";

export class Database {
  private static pool: Pool;

  static init() {
    if (!Database.pool) {
      Database.pool = new Pool({
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASS,
        database: env.DB_NAME,
      });

      Database.pool
        .connect()
        .then(() => console.log("Connected to PostgreSQL"))
        .catch((err) => console.error("DB connection error:", err));
    }
  }

  static getPool(): Pool {
    if (!Database.pool) {
      throw new Error(
        "Database pool not initialized. Call Database.init() first."
      );
    }
    return Database.pool;
  }
}
