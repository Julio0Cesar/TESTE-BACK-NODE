import { Router } from "express"
import { emitirNotaFiscal, listarNotaFiscal } from "../controllers/FaturaController"

const router = Router()

router.post("/emitir", emitirNotaFiscal)
router.get("/listar", listarNotaFiscal)
export default router
