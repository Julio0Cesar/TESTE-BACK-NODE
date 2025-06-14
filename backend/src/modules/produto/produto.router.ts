import { Router } from "express"
import { handleCriarProduto, handleListarProdutos } from "./produto.controller"
import { criarProdutoSchema } from "./schemas/criar-produto.schemas"
import { validarSchemas } from "../../shared/middleware/validar-schemas-middleware"
import { autenticarJWT } from "../../shared/middleware/validar-jwt-middleware"

const router = Router()

router.post("",autenticarJWT, validarSchemas(criarProdutoSchema), handleCriarProduto)
router.get("", handleListarProdutos)
export default router
