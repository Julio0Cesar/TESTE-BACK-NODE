import { NotaFiscal } from "../../core/entities/NotaFiscal"
import * as js2xmlparser from "js2xmlparser"

export function gerarXmlNotaFiscal(notaFiscal: NotaFiscal): string {
  const { cliente, itens, valorTotal, icmsTotal, ipiTotal } = notaFiscal

  const obj = {
    cliente: {
      nome: cliente.nome,
      cnpj: cliente.cnpj,
      email: cliente.email,
    },
    itens: itens.map(item => ({
      produto: item.produto.nome,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      icms: item.icms,
      ipi: item.ipi,
      total: item.total,
    })),
    total: {
      valorTotal,
      icmsTotal,
      ipiTotal,
    },
  }

  return js2xmlparser.parse("notaFiscal", obj)
}
