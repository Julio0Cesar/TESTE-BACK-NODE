import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalItem } from "../../core/entities/NotaFiscalItem"
import { AppDataSource } from "../../config/ormconfig"

// Pesquisar
export async function buscarNotasFiscaisPorId(id: string, clienteId: string) {
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  return await notaFiscalRepo.findOne({
  where: {
    id,
    cliente: { id: clienteId }
  },
    relations: ["cliente", "itens", "itens.produto"],
  })
}
export async function buscarNotasFiscaisPorCliente(clienteId: string) {
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  return await notaFiscalRepo.find({
    where: {
      cliente: { id: clienteId }
    },
    relations: ["cliente", "itens", "itens.produto"],
  })
}

// Registrar
export async function salvarNotaFiscal(notaFiscalParcial: Partial<NotaFiscal> ) {
  const notaRepo = AppDataSource.getRepository(NotaFiscal)
  const itemRepo = AppDataSource.getRepository(NotaFiscalItem)
  
  // Separa os itens da nota fiscal dos demais dados
  const { itens: itensNota = [], ...notaData } = notaFiscalParcial

  const notaFiscal = notaRepo.create(notaData)
  await notaRepo.save(notaFiscal)

  // Anexa a Nota Fiscal recém-criada a cada item para referência
  const itensComNota = itensNota.map(item => ({
    ...item,
    notaFiscal,
  }))

  await itemRepo.save(itensComNota)
  return notaFiscal
}
