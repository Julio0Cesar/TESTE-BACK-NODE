import express from "express"
import "reflect-metadata"
import dotenv from "dotenv"
import { testDbConnection } from "./config/DatabaseConfig"
import { initializeDataSource } from "./ormconfig"
import clientsRouter from "./routes/Clients"

dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT

app.use(express.json())
app.use("/clients", clientsRouter)

app.get("/", (_req, res) => {
  res.send("API rodando com sucesso!")
})

async function startServer() {
  try {
    await initializeDataSource()
    console.log("Conexão com banco via TypeORM OK!")

    await testDbConnection()
    console.log("Teste de conexão finalizado")

    app.listen(port, () => {
      console.log(`🚀 Server tá no ar na porta ${port}`)
    })
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error)
    process.exit(1)
  }
}

startServer()