import { Request, Response } from "express"
import { AutenticacaoDTO } from "./dto/autenticacao.dto"
import { registrarNovoLogin } from "./autenticacao.service"
import { logger } from "../../shared/logs/logger"

//POST: /login
export async function handleLoginCliente(req: Request<{}, {}, AutenticacaoDTO>, res: Response){
    const novoLogin = await registrarNovoLogin(req.body)
    logger.info(`Login: ${novoLogin.cliente.nome}, realizado com sucesso (200 OK)`)
    res.status(201).json({ message: "Login realizado com sucesso", novoLogin})
}