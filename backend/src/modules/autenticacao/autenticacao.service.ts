import { HttpError } from "../../core/error/HttpError"
import { buscarClientePorEmail } from "../cliente/cliente.repository"
import { AutenticacaoDTO } from "./dto/autenticacao.dto"
import { gerarToken } from '../../shared/utils/gerar-jwt'
import { compararSenha } from '../../shared/utils/gerar-hash'

export async function registrarNovoLogin(data: AutenticacaoDTO){
  const cliente = await validarLogin(data.email, data.senha)
  const token = gerarToken({ id: cliente.id, email: cliente.email })
  return { token, cliente: { id: cliente.id, nome: cliente.nome } }
}

// Validacoes
export async function validarLogin(email: string, senha: string){
  const cliente = await buscarClientePorEmail(email)
  if(!cliente) throw new HttpError("Cliente não existe", 400)

  const senhaValida = await compararSenha(senha, cliente.senha)
  if (!senhaValida) throw new HttpError("Senha inválida", 400)
  
  return cliente
}