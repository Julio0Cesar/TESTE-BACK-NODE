import { HttpError } from "../../core/error/HttpError"
import { gerarHashSenha } from "../../shared/utils/gerar-hash"
import { buscarClientes, buscarClientePorEmailOuCnpj, salvarCliente, buscarClientePorId } from "./cliente.repository"
import { ClienteDTO } from "./dto/create-cliente.dto"

export async function registrarNovoCliente(data: ClienteDTO) {
  await validarClienteRegistrados(data.email, data.cnpj)
  const senhaHash = await gerarHashSenha(data.senha)
  data.senha = senhaHash 
  return await salvarCliente(data)
}
export async function listarClientes() {
  const clientes = await buscarClientes() 
  if (!clientes) throw new HttpError("Não existem clientes registrados", 400)
  return clientes
}

// Validacoes
export async function validarClienteRegistrados(email: string, cnpj:  string){
  const existente = await buscarClientePorEmailOuCnpj(email, cnpj)
  if (existente) throw new HttpError("Cliente já registrado", 400)
}
export async function validarClienteNaoEncontrado(id: string) {
  const existente = await buscarClientePorId(id)
  if (!existente) throw new HttpError("Cliente não encontrado", 400)
  return existente
}