import { AppDataSource } from "../ormconfig"
import { Cliente } from "../models/entities/Cliente"

interface ClienteInput {
  nome?: string
  email?: string
  cnpj?: string
}

export async function createClient(data: ClienteInput) {
  const { nome, email, cnpj } = data

  if (!nome || !email || !cnpj) {
    throw new Error("Campos obrigatórios faltando")
  }

  const clienteRepo = AppDataSource.getRepository(Cliente)

  const existingClient = await clienteRepo.findOneBy([
    { email },
    { cnpj }
  ])

  if (existingClient) {
    throw new Error("Cliente já cadastrado")
  }

  const novoCliente = clienteRepo.create({ nome, email, cnpj })
  await clienteRepo.save(novoCliente)

  return novoCliente
}
