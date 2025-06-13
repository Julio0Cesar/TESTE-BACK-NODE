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

export async function buscarNotasFiscais(){
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  return await notaFiscalRepo.find()
}

export async function buscarNotasFiscaisPorId(id: string, clienteId: string) {
    console.log("id:", id)
    console.log("clienteid:", clienteId)
    const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
    const resultado = await notaFiscalRepo.findOne({
    where: {
      id,
      cliente: { id: clienteId }
    },
      relations: ["cliente", "itens", "itens.produto"],
    })
    console.log("resultado: ",resultado)
    return resultado
}