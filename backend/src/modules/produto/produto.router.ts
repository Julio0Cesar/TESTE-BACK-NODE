import { Router } from "express"
import { handleCriarProduto, handleListarProdutos } from "./produto.controller"
import { createProdutoSchema } from "./schemas/criar-produto.schemas"
import { validateRequest } from "../../shared/middleware/validate-request"

const router = Router()

router.post("/criar", validateRequest(createProdutoSchema), handleCriarProduto)
router.get("/listar", handleListarProdutos)
export default router
