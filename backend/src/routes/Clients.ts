import { Router } from "express"
import { createClient } from "../controllers/ClientsController"

const router = Router()

router.post("/", createClient)

export default router
