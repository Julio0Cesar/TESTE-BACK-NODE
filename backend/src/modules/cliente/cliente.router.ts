import { Router } from "express"
import { createClient, listClients } from "./cliente.controller"

const router = Router()

router.post("/criar", createClient)
router.get("/listar", listClients)
export default router
