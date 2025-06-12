import { erroHandling } from "../../shared/errors/erro-handling"
import { buscarClientes, buscarPorEmailOuCnpj, salvarCliente } from "./cliente.repository"
import { ClienteDTO } from "./dto/create-cliente.dto"

export async function registrarNovoCliente(data: ClienteDTO) {
  const { email, cnpj } = data

  const clienteExistente = await buscarPorEmailOuCnpj(email, cnpj)
  if (clienteExistente) {
    throw new erroHandling("Cliente já registrado", 400)
  }

  return await salvarCliente(data)
}

export async function listarClientes() {
  return await buscarClientes() 
}