import { Request, Response } from "express"
import { AutenticacaoDTO } from "./dto/autenticacao.dto"
import { registrarNovoLogin, validarTokenCliente } from "./autenticacao.service"
import { logger } from "../../shared/logs/logger"

//POST: /login
export async function handleLoginCliente(req: Request<{}, {}, AutenticacaoDTO>, res: Response){
    const novoLogin = await registrarNovoLogin(req.body)
    logger.info(`Login: ${novoLogin.cliente.nome}, realizado com sucesso (200 OK)`)
    res.status(201).json({ message: "Login realizado com sucesso", novoLogin})
}

//POST: /validar
export async function handleValidarLoginCliente(req: Request, res: Response, token: string){
    const validado = await validarTokenCliente(token)
    logger.info(`Cliente: validado com sucesso (200 OK)`)
    res.status(201).json({ message: "Token validado com sucesso", validado})
}