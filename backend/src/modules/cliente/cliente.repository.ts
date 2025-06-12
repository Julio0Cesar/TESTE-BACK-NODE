import { Cliente } from "../../core/entities/Cliente";
import { AppDataSource } from "../../ormconfig";

export async function buscarPorEmailOuCnpj(email: string, cnpj: string) {
  return AppDataSource.getRepository(Cliente).findOneBy([{ email }, { cnpj }])
}

export async function salvarCliente(data: Partial<Cliente>) {
  const repo = AppDataSource.getRepository(Cliente)
  const novoCliente = repo.create(data)
  return await repo.save(novoCliente)
}

export async function buscarClientes() {
  const clienteRepo = AppDataSource.getRepository(Cliente)
  return await clienteRepo.find()
}
