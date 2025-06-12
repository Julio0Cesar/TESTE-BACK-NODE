import { Router } from "express"
import { handleDetalharNotaFiscal, handleEmitirNotaFiscal, handleListarNotaFiscal } from "./nota-fiscal.controller"
import { validateRequest } from "../../shared/middleware/validate-request"
import { criarNotaFiscalSchema } from "./schemas/criar-nota-fiscal.schemas"

const router = Router()

router.post("/emitir", validateRequest(criarNotaFiscalSchema), handleEmitirNotaFiscal)
router.get("/listar", handleListarNotaFiscal)
router.get("/listar/:id", handleDetalharNotaFiscal)
export default router
