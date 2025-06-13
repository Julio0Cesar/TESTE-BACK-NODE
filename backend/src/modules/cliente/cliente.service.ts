import { HttpError } from "../../shared/middleware/error-middleware"
import { hashSenha } from "../../shared/utils/hash"
import { buscarClientes, buscarClientePorEmailOuCnpj, salvarCliente, buscarClientePorId } from "./cliente.repository"
import { ClienteDTO } from "./dto/create-cliente.dto"

export async function registrarNovoCliente(data: ClienteDTO) {
  await validarClienteRegistradoPorEmailOuCnpj(data.email, data.cnpj)

  const senhaHash = await hashSenha(data.senha)
  data.senha = senhaHash 

  return await salvarCliente(data)
}

export async function listarClientes() {
  return await buscarClientes() 
}

export async function validarClienteRegistradoPorEmailOuCnpj(email: string, cnpj:  string){
  const existente = await buscarClientePorEmailOuCnpj(email, cnpj)
  if (existente) 
    throw new HttpError("Cliente já registrado", 400)
}

export async function validarClienteNaoEncontradoPorId(id: string) {
  const existente = await buscarClientePorId(id)
  if (!existente) 
    throw new HttpError("Cliente não encontrado", 400)
  return existente
}
