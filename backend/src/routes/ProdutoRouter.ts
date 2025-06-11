import { Router } from "express"
import { criarProduto } from "../controllers/ProdutoController"

const router = Router()

router.post("/criar", criarProduto)
export default router
