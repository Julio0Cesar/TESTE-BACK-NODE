import express from "express"
import "reflect-metadata"
import dotenv from "dotenv"
import { testDbConnection } from "./config/databaseConfig"
import { initializeDataSource } from "./ormconfig"
import { errorHandler } from "./shared/middleware/error-middleware"
import clienteRouter from "./modules/cliente/cliente.router"
import produtoRouter from "./modules/produto/produto.router"
import NotaFiscalRouter from "./modules/nota-fiscal/nota-fiscal.router"
import autenticacaoRouter from "./modules/autenticacao/autenticacao.router"

dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT

app.use(express.json())
app.use("/cliente", clienteRouter)
app.use("/produto", produtoRouter)
app.use("/fatura", NotaFiscalRouter)
app.use("/autenticacao", autenticacaoRouter)
app.use(errorHandler)

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
      console.log(`Server tá no ar na porta ${port}`)
    })
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error)
    process.exit(1)
  }
}

startServer()