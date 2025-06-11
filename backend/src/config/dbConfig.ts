import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  host: process.env.MARIADB_HOST || "localhost",
  user: process.env.MARIADB_USER || "root",
  password: process.env.MARIADB_PASSWORD || "",
  database: process.env.MARIADB_DATABASE || "meubanco",
  port: Number(process.env.MARIADB_PORT) || 3306,
}
