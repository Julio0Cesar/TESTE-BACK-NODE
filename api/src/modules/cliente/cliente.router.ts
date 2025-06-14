import { Router } from "express"
import { handleCriarCliente, handleListarClientes } from "./cliente.controller"
import { criarClienteSchema } from "./schemas/create-cliente.schemas"
import { validarSchemas } from "../../shared/middleware/validar-schemas-middleware"
import { autenticarJWT } from "../../shared/middleware/validar-jwt-middleware"

const router = Router()

router.post("", validarSchemas(criarClienteSchema), handleCriarCliente)
router.get("", autenticarJWT, handleListarClientes)
export default router
