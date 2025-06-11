import { AppDataSource } from "../ormconfig"
import { Cliente } from "../models/entities/Cliente"
import { Produto } from "../models/entities/Produto"
import { NotaFiscal } from "../models/entities/NotaFiscal"
import { NotaFiscalItem } from "../models/entities/NotaFiscalItem"

interface EmitirNotaFiscalInput {
  clientId: string
  products: {
    productId: string
    quantity: number
  }[]
}

export async function emitirNotaFiscal(data: EmitirNotaFiscalInput) {
  const { clientId, products } = data

  if (!clientId || !products || products.length === 0) {
    throw new Error("Dados da nota fiscal inválidos")
  }

  const clienteRepo = AppDataSource.getRepository(Cliente)
  const produtoRepo = AppDataSource.getRepository(Produto)
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  const notaFiscalItemRepo = AppDataSource.getRepository(NotaFiscalItem)

  const cliente = await clienteRepo.findOneBy({ id: Number(clientId) })
  if (!cliente) {
    throw new Error("Cliente não encontrado")
  }

  let valorTotal = 0
  let icmsTotal = 0
  let ipiTotal = 0

  const itensNota: NotaFiscalItem[] = []

  for (const item of products) {
    const produto = await produtoRepo.findOneBy({ id: item.productId })
    if (!produto) throw new Error(`Produto com ID ${item.productId} não encontrado`)

    const quantidade = item.quantity
    const preco = produto.precoUnitario

    const icms = preco * quantidade * 0.18
    const ipi = produto.industrializado ? preco * quantidade * 0.04 : 0
    const total = preco * quantidade

    valorTotal += total + icms + ipi
    icmsTotal += icms
    ipiTotal += ipi

    const notaItem = notaFiscalItemRepo.create({
      produto,
      quantidade,
      precoUnitario: preco,
      icms,
      ipi,
      total,
    })

    itensNota.push(notaItem)
  }

  const notaFiscal = notaFiscalRepo.create({
    cliente,
    dataEmissao: new Date(),
    valorTotal,
    icmsTotal,
    ipiTotal,
    itens: itensNota,
    xml: "ainda_nao_gerado", // placeholder
  })

  await notaFiscalRepo.save(notaFiscal)
  for (const item of itensNota) {
    item.notaFiscal = notaFiscal
    await notaFiscalItemRepo.save(item)
  }

  return notaFiscal
}
