import { AppDataSource } from "../../ormconfig"
import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto"
import { validarClienteNaoEncontradoPorId } from "../cliente/cliente.service"
import { validarProdutoNaoEncontradoPorId } from "../produto/produto.service"
import { calcularNotaFiscal } from "../../shared/utils/calcular-nota-fiscal"
import { salvarNotaFiscal } from "./nota-fiscal.repository"
import { gerarXmlNotaFiscal } from "../../shared/utils/gerar-xml"
import { HttpError } from "../../shared/errors/error-middleware"

export async function registrarNovaNotaFiscal(data: NotaFiscalDTO) {
  const cliente = await validarClienteNaoEncontradoPorId(data.clientId)
  const produtos = await buscarProdutosNaNotaFiscal(data.products)

  const resultado = calcularNotaFiscal(produtos, data.products)
  
  const notaFiscalParcial = { 
    cliente, 
    ...resultado, 
    xml: gerarXmlNotaFiscal( { cliente, ...resultado } as NotaFiscal) 
  }

  const notaFiscal = await salvarNotaFiscal(notaFiscalParcial)  
  return notaFiscal
}

export async function listarNotasFiscais() {
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  const notasFiscais = await notaFiscalRepo.find()
  return notasFiscais
}

export async function listarNotaFiscalPorId(id: string) {
  const notaFiscalRepo = AppDataSource.getRepository(NotaFiscal)
  const nota = await notaFiscalRepo.findOne({
    where: { id },
    relations: ["cliente", "itens", "itens.produto"],
  })
  return nota
}

async function buscarProdutosNaNotaFiscal(itens: NotaFiscalDTO["products"]) {
  if (!Array.isArray(itens)) 
    throw new HttpError("Produtos da nota fiscal devem ser uma lista", 400)
  
  const produtos = []

  for (const item of itens) {
    const produto = await validarProdutoNaoEncontradoPorId(item.productId)
    produtos.push(produto)
  }

  return produtos
}
