import { Router } from "express"
import { criarProduto, listarProdutos } from "./produto.controller"

const router = Router()

router.post("/criar", criarProduto)
router.get("/listar", listarProdutos)
export default router
