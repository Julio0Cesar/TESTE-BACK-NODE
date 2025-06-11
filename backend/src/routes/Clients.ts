import { Router } from "express"
import { createClient, listClients } from "../controllers/ClientsController"

const router = Router()

router.post("/criar", createClient)
router.get("/listar", listClients)
export default router
