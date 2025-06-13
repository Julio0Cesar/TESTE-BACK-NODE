import { Router } from "express"
import { validateRequest } from "../../shared/middleware/validate-request"
import { criarAutenticacaoSchema } from "./schemas/autenticacao.schemas"
import { handleLoginCliente } from "./autenticacao.controller"

const router = Router()

router.post("/login", validateRequest(criarAutenticacaoSchema), handleLoginCliente)

export default router