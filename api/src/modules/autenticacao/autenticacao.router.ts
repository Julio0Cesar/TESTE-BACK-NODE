import { Router } from "express"
import { validarSchemas } from "../../shared/middleware/validar-schemas-middleware"
import { criarAutenticacaoSchema } from "./schemas/autenticacao.schemas"
import { handleLoginCliente, handleValidarLoginCliente } from "./autenticacao.controller"

const router = Router()

router.post("/login", validarSchemas(criarAutenticacaoSchema), handleLoginCliente)
router.get("/validar", handleValidarLoginCliente)

export default router