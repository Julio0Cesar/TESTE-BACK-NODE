import { DataSource } from "typeorm";
import { dbConfig } from "./config/dbConfig";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: false,
});

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}
