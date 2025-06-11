import { Router } from "express"
import { criarProduto, listarProdutos } from "../controllers/ProdutoController"

const router = Router()

router.post("/criar", criarProduto)
router.get("/listar", listarProdutos)
export default router
