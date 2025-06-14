import bcrypt from 'bcrypt'
import { HttpError } from "../../shared/middleware/error-middleware"
import { buscarClientePorEmail } from "../cliente/cliente.repository"
import { AutenticacaoDTO } from "./dto/autenticacao.dto"
import { gerarToken } from '../../shared/utils/gerar-jwt'

export async function registrarNovoLogin(data: AutenticacaoDTO){
    const cliente = await validarClienteExiste(data.email, data.senha)
    
    const token = gerarToken({ id: cliente.id, email: cliente.email })

    return { token, cliente: { id: cliente.id, nome: cliente.nome } }
}

export async function validarClienteExiste(email: string, senha: string){
    const cliente = await buscarClientePorEmail(email)
    if(!cliente) 
        throw new HttpError("Cliente não existe", 400)

  const senhaValida = await bcrypt.compare(senha, cliente.senha)
  if (!senhaValida) 
    throw new HttpError("Senha inválida", 400)

  return cliente
}