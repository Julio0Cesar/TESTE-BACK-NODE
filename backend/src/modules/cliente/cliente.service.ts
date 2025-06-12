import { AppDataSource } from "../../ormconfig"
import { Cliente } from "../../core/entities/Cliente"
import { erroHandling } from "../../shared/errors/erro-handling"

interface ClienteInput {
  nome?: string
  email?: string
  cnpj?: string
  senha?: string
}

export async function criarClienteNoBancoAsync(data: ClienteInput) {
  const { nome, email, cnpj, senha } = data

  const clienteRepo = AppDataSource.getRepository(Cliente)

  const existingClient = await clienteRepo.findOneBy([ { email }, { cnpj } ])
  if (existingClient) {
    throw new erroHandling("Cliente já registrado", 400)
  }

  const novoCliente = clienteRepo.create({ nome, email, cnpj, senha })
  await clienteRepo.save(novoCliente)
  return novoCliente
}

export async function listarClientesDoBancoAsync() {
  const clienteRepo = AppDataSource.getRepository(Cliente)
  const clientes = await clienteRepo.find()
  return clientes
}