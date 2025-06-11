import { Router } from "express"
import { emitirNotaFiscal, listarNotaFiscal, detalharNotaFiscal } from "../controllers/FaturaController"

const router = Router()

router.post("/emitir", emitirNotaFiscal)
router.get("/listar", listarNotaFiscal)
router.get("/listar/:id", detalharNotaFiscal)
export default router
