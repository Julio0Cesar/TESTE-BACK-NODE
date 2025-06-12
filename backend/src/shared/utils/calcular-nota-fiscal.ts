import { NotaFiscalItem } from "../../core/entities/NotaFiscalItem"
import { Produto } from "../../core/entities/Produto"

export function criarCalculadoraNotaFiscal() {
  let valorTotal = 0
  let icmsTotal = 0
  let ipiTotal = 0
  const itensNota: NotaFiscalItem[] = []

  function calcularItem(produto: Produto, quantidade: number) {
    const preco = produto.preco
    const icms = preco * quantidade * 0.18
    const ipi = produto.industrializado ? preco * quantidade * 0.04 : 0
    const total = preco * quantidade

    valorTotal += total + icms + ipi
    icmsTotal += icms
    ipiTotal += ipi

    const notaItem = {
      produto,
      quantidade,
      precoUnitario: preco,
      icms,
      ipi,
      total,
    } as NotaFiscalItem

    itensNota.push(notaItem)
  }

  function resultado() {
    return {
      valorTotal,
      icmsTotal,
      ipiTotal,
      itensNota,
    }
  }

  return {
    calcularItem,
    resultado,
  }
}
