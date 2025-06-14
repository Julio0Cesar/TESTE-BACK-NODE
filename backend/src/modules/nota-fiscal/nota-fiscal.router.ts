import { Router } from "express"
import { handleDetalharNotaFiscal, handleEmitirNotaFiscal, handleListarNotasFiscais } from "./nota-fiscal.controller"
import { validarSchemas } from "../../shared/middleware/validar-schemas-middleware"
import { criarNotaFiscalSchema } from "./schemas/criar-nota-fiscal.schemas"
import { autenticarJWT } from "../../shared/middleware/validar-jwt-middleware"

const router = Router()

router.post("", autenticarJWT, validarSchemas(criarNotaFiscalSchema), handleEmitirNotaFiscal)
router.get("", autenticarJWT, handleListarNotasFiscais)
router.get("/:id", autenticarJWT, handleDetalharNotaFiscal)
export default router