import { DataSource } from "typeorm"
import { Cliente } from "../core/entities/Cliente"
import { dbConfig } from "./dbConfig"
import { Produto } from "../core/entities/Produto"
import { NotaFiscal } from "../core/entities/NotaFiscal"
import { NotaFiscalItem } from "../core/entities/NotaFiscalItem"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Cliente, Produto, NotaFiscal, NotaFiscalItem],
  synchronize: true,
  logging: false,
})

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
}
