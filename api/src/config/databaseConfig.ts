import mysql from "mysql2/promise"
import { dbConfig } from "./dbConfig"
import { logger } from "../shared/logs/logger"

export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function testDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    await connection.connect()
    logger.info("Conectado ao banco MariaDB com sucesso!")
    await connection.end()
  } catch (error) {
    logger.error("Erro ao conectar no banco:", error)
  }
}
