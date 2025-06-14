/**
 * @returns Um objeto contendo:
 *   - valorTotal: soma total dos produtos mais impostos,
 *   - icmsTotal: total do ICMS (18%) sobre os produtos,
 *   - ipiTotal: total do IPI (4%) apenas para produtos industrializados,
 *   - itens: lista de itens com cálculo detalhado para cada um.
 * 
 * O cálculo para cada item:
 *  - ICMS = preço * quantidade * 18%
 *  - IPI = preço * quantidade * 4% se industrializado, senão zero
 *  - Total = preço * quantidade
 */

import Decimal from "decimal.js"
import { Produto } from "../../core/entities/Produto"
import { NotaFiscalItem } from "../../core/entities/NotaFiscalItem"
import { NotaFiscalDTO } from "../../modules/nota-fiscal/dto/criar-nota-fiscal.dto"

export function calcularNotaFiscal(produtos: Produto[], itensNota: NotaFiscalDTO["products"]) {
  let valorTotal = new Decimal(0)
  let icmsTotal = new Decimal(0)
  let ipiTotal = new Decimal(0)
  const itensCalculados: NotaFiscalItem[] = []

  for (let i = 0; i < itensNota.length; i++) {
    const produto = produtos[i]
    const { quantity } = itensNota[i]
    const preco = new Decimal(produto.preco)
    const qtd = new Decimal(quantity)

    const icms = preco.mul(qtd).mul(0.18)
    const ipi = produto.industrializado ? preco.mul(qtd).mul(0.04) : new Decimal(0)
    const total = preco.mul(qtd)

    valorTotal = valorTotal.plus(total).plus(icms).plus(ipi)
    icmsTotal = icmsTotal.plus(icms)
    ipiTotal = ipiTotal.plus(ipi)

    itensCalculados.push({
      produto,
      quantidade: quantity,
      precoUnitario: preco.toNumber(),
      icms: icms.toNumber(),
      ipi: ipi.toNumber(),
      total: total.toNumber(),
    } as NotaFiscalItem)
  }

  return {
    valorTotal: valorTotal.toNumber(),
    icmsTotal: icmsTotal.toNumber(),
    ipiTotal: ipiTotal.toNumber(),
    itens: itensCalculados,
  }
}
