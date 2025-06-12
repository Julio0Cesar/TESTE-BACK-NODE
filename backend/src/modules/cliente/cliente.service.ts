import { HttpError } from "../../shared/errors/error-middleware"
import { hashSenha } from "../../shared/utils/hash"
import { buscarClientes, buscarPorEmailOuCnpj, salvarCliente } from "./cliente.repository"
import { ClienteDTO } from "./dto/create-cliente.dto"

export async function registrarNovoCliente(data: ClienteDTO) {
  const { email, cnpj } = data

  const clienteExistente = await buscarPorEmailOuCnpj(email, cnpj)
  if (clienteExistente) {
    throw new HttpError("Cliente já registrado", 400)
  }

  const senhaHash = await hashSenha(data.senha)
  data.senha = senhaHash 

  return await salvarCliente(data)
}

export async function listarClientes() {
  return await buscarClientes() 
}