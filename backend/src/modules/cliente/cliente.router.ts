import { Router } from "express"
import { handleCriarCliente, handleListarClientes } from "./cliente.controller"
import { createClienteSchema } from "./schemas/create-cliente.schemas"
import { validateRequest } from "../../shared/middleware/validate-request"

const router = Router()

router.post("/criar", validateRequest(createClienteSchema), handleCriarCliente)
router.get("/listar", handleListarClientes)
export default router
