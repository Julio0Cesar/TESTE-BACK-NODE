import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalItem } from "../../core/entities/NotaFiscalItem"
import { AppDataSource } from "../../ormconfig"

export async function salvarNotaFiscal(notaFiscalParcial: Partial<NotaFiscal> ) {
  const notaRepo = AppDataSource.getRepository(NotaFiscal)
  const itemRepo = AppDataSource.getRepository(NotaFiscalItem)
  
  const { itens: itensNota = [], ...notaData } = notaFiscalParcial

  const notaFiscal = notaRepo.create(notaData)
  await notaRepo.save(notaFiscal)

  const itensComNota = itensNota.map(item => ({
    ...item,
    notaFiscal,
  }))

  await itemRepo.save(itensComNota)
  return notaFiscal
}

export async function buscarNotaFiscal(notaFiscal: NotaFiscal){
    const repo = AppDataSource.getRepository(NotaFiscal)
}