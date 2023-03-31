import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const configDatabase = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = new Pool(configDatabase);
