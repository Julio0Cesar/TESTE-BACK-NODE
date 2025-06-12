import { Router } from "express"
import { criarClienteAsync, listClients } from "./cliente.controller"
import { createClienteSchema } from "./schemas/create-cliente.schemas"
import { validateRequest } from "../../shared/middleware/validate-request"

const router = Router()

router.post("/criar", validateRequest(createClienteSchema), criarClienteAsync)
router.get("/listar", listClients)
export default router
