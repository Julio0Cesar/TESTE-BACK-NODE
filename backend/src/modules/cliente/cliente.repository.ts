import { Cliente } from "../../core/entities/Cliente"
import { AppDataSource } from "../../config/ormconfig"

// Pesquisar
export async function buscarClientePorEmailOuCnpj(email: string, cnpj: string) {
  return AppDataSource.getRepository(Cliente).findOneBy([{ email }, { cnpj }])
}
export async function buscarClientePorEmail(email: string) {
  return AppDataSource.getRepository(Cliente)
    .createQueryBuilder("cliente")
    .addSelect("cliente.senha")
    .where("cliente.email = :email", { email })
    .getOne()
}
export async function buscarClientePorId(id: string): Promise<Cliente | null> {
  return await AppDataSource.getRepository(Cliente).findOneBy({ id })
}
export async function buscarClientes() {
  const clienteRepo = AppDataSource.getRepository(Cliente)
  return await clienteRepo.find()
}

// Registrar
export async function salvarCliente(data: Partial<Cliente>) {
  const repo = AppDataSource.getRepository(Cliente)
  const novoCliente = repo.create(data)
  return await repo.save(novoCliente)
}