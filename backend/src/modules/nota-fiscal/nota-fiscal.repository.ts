import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalItem } from "../../core/entities/NotaFiscalItem"
import { AppDataSource } from "../../ormconfig"

export async function salvarNotaFiscal(data: Partial<NotaFiscal> ) {
  const notaRepo = AppDataSource.getRepository(NotaFiscal)
  const itemRepo = AppDataSource.getRepository(NotaFiscalItem)
  
  const { itens: itensNota = [], ...notaData } = data

  const notaFiscal = notaRepo.create(notaData)
  await notaRepo.save(notaFiscal)

  for (const item of itensNota) {
    item.notaFiscal = notaFiscal
    await itemRepo .save(item)
  }

  return notaFiscal
}

export async function buscarNotaFiscal(notaFiscal: NotaFiscal){
    const repo = AppDataSource.getRepository(NotaFiscal)
}