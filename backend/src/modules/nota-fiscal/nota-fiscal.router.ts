import { Router } from "express"
import { handleDetalharNotaFiscal, handleEmitirNotaFiscal, handleListarNotasFiscais } from "./nota-fiscal.controller"
import { validateRequest } from "../../shared/middleware/validate-request"
import { criarNotaFiscalSchema } from "./schemas/criar-nota-fiscal.schemas"
import { autenticarJWT } from "../../shared/middleware/validar-token-jwt"

const router = Router()

router.post("/emitir", validateRequest(criarNotaFiscalSchema), handleEmitirNotaFiscal)
router.get("/listar", autenticarJWT, handleListarNotasFiscais)
router.get("/listar/:id", autenticarJWT, handleDetalharNotaFiscal)
export default router
