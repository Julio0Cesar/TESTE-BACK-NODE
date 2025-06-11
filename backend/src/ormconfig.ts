import { DataSource } from "typeorm"
import { Cliente } from "./models/entities/Cliente"
import { dbConfig } from "./config/dbConfig"
import { Produto } from "./models/entities/Produto"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Cliente, Produto],
  synchronize: true,
  logging: false,
})

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
}
