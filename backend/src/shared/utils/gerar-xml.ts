/**
 * Gera uma string XML representando a nota fiscal passada.
 * 
 * Extrai os dados do cliente, itens e totais da nota, monta um objeto com essa estrutura
 * e converte para XML usando o js2xmlparser.
 * 
 * O XML terá a raiz <notaFiscal> com:
 *  - cliente: nome, cnpj e email
 *  - itens: lista detalhada com produto, quantidade, preço unitário e impostos
 *  - total: valores totais de valor, ICMS e IPI
 * 
 * @returns String XML formatada da nota fiscal.
 */

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