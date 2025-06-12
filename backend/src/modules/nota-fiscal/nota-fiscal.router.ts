import { Router } from "express"
import { emitirNotaFiscal, listarNotaFiscal, detalharNotaFiscal } from "./nota-fiscal.controller"

const router = Router()

router.post("/emitir", emitirNotaFiscal)
router.get("/listar", listarNotaFiscal)
router.get("/listar/:id", detalharNotaFiscal)
export default router
