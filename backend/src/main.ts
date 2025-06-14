import { app, port } from "./shared/app"
import { testDbConnection } from "./config/databaseConfig"
import { initializeDataSource } from "./config/ormconfig"
import { logger } from "./shared/logs/logger"

async function startServer() {
  try {
    await testDbConnection()

    await initializeDataSource()
    logger.info("Conexão com banco via TypeORM OK!")

    app.listen(port, () => {
      logger.info(`Server tá no ar na porta ${port}`)
    })
  } catch (error) {
    logger.error("Erro ao iniciar aplicação:", error)
    process.exit(1)
  }
}

startServer()