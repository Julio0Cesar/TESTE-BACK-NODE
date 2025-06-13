import { Request, Response } from "express"
import { AutenticacaoDTO } from "./dto/autenticacao.dto"
import { registrarNovoLogin } from "./autenticacao.service"


export async function handleLoginCliente(req: Request<{}, {}, AutenticacaoDTO>, res: Response){
    const novoLogin = await registrarNovoLogin(req.body)
    res.status(201).json({ message: "Login realizado com sucesso", novoLogin})
    return
}