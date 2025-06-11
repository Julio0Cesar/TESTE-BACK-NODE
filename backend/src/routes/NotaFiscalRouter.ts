import { Router } from "express"
import { emitirNotaFiscal } from "../controllers/FaturaController"

const router = Router()

router.post("/emitir", emitirNotaFiscal)
export default router
