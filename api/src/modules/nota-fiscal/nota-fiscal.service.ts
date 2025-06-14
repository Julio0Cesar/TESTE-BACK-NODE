import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto"
import { validarClienteNaoEncontrado } from "../cliente/cliente.service"
import { validarProdutoNaoEncontrado } from "../produto/produto.service"
import { calcularNotaFiscal } from "../../shared/utils/calcular-nota-fiscal"
import { buscarNotasFiscaisPorId, buscarNotasFiscaisPorCliente, salvarNotaFiscal } from "./nota-fiscal.repository"
import { gerarXmlNotaFiscal } from "../../shared/utils/gerar-xml"
import { HttpError } from "../../core/error/HttpError"

export async function registrarNovaNotaFiscal(data: NotaFiscalDTO) {
  const cliente = await validarClienteNaoEncontrado(data.clientId)
  const produtos = await buscarProdutosNaNotaFiscal(data.products)

  const resultado = calcularNotaFiscal(produtos, data.products)
  
  const notaFiscalParcial = { 
    cliente, 
    ...resultado, 
    xml: gerarXmlNotaFiscal( { cliente, ...resultado } as NotaFiscal) 
  }
  return await salvarNotaFiscal(notaFiscalParcial)
}

export async function listarNotaFiscalPorCliente(clienteId: string) {
  const notaFiscal = await buscarNotasFiscaisPorCliente(clienteId)
  if (notaFiscal.length === 0) throw new HttpError("Nota fiscal não encontrada", 404)
  return notaFiscal
}

export async function detalharNotaFiscalPorId(id: string, clienteId: string) {
  const notaFiscal = await buscarNotasFiscaisPorId(id, clienteId)
  if (!notaFiscal) throw new HttpError("Nota fiscal não encontrada", 404)
  return notaFiscal
}

async function buscarProdutosNaNotaFiscal(itens: NotaFiscalDTO["products"]) {
  if (!Array.isArray(itens)) throw new HttpError("Produtos da nota fiscal devem ser uma lista", 400)
  
  const produtos = []

  for (const item of itens) {
    const produto = await validarProdutoNaoEncontrado(item.productId)
    produtos.push(produto)
  }
  return produtos
}