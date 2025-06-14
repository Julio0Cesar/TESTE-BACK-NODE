import express from "express"
import dotenv from "dotenv"
import clienteRouter from "../modules/cliente/cliente.router"
import produtoRouter from "../modules/produto/produto.router"
import notaFiscalRouter from "../modules/nota-fiscal/nota-fiscal.router"
import autenticacaoRouter from "../modules/autenticacao/autenticacao.router"
import { errorHandler, notFoundHandler } from "./middleware/tratar-erros-middleware"
import { setupSwagger } from "./docs/swagger"

// Configs
dotenv.config()
const port = process.env.BACKEND_PORT

const app = express()
app.use(express.json())

// Rotas
app.use("/clients", clienteRouter)
app.use("/products", produtoRouter)
app.use("/invoices", notaFiscalRouter)
app.use("/auth", autenticacaoRouter)

// Swagger
setupSwagger(app)

// Middlewares globais
app.use(errorHandler)
app.use(notFoundHandler)


export { app, port }