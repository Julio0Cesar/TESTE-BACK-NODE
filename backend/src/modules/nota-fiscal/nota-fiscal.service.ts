import { AppDataSource } from "../../ormconfig"
import { NotaFiscal } from "../../core/entities/NotaFiscal"
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto"
import { HttpError } from "../../shared/errors/error-middleware"
import { buscarClientePorId } from "../cliente/cliente.repository"
import { buscarProdutoPorId } from "../produto/produto.repository"
import { criarCalculadoraNotaFiscal } from "../../shared/utils/calcular-nota-fiscal"
import { salvarNotaFiscal } from "./nota-fiscal.repository"

export async function registrarNovaNotaFiscal(data: NotaFiscalDTO) {
  const { clienteId, produtos } = data

  const clienteRepo = await buscarClientePorId(clienteId)
  if (!clienteRepo) 
    throw new HttpError("Cliente não encontrado", 400)

  const calculadora = criarCalculadoraNotaFiscal()
  for (const item of produtos) {
    const produto = await buscarProdutoPorId(item.produtoId)

    if (!produto) 
      throw new HttpError("Produto não encontrado", 400)

    calculadora.calcularItem(produto, item.quantidade)
  }
  
  const  { valorTotal, icmsTotal, ipiTotal, itensNota } = calculadora.resultado()
  const notaFiscal = await salvarNotaFiscal({
    cliente: clienteRepo,
    valorTotal,
    icmsTotal,
    ipiTotal,
    itens: itensNota,
    xml: "ainda_nao_gerado",
  })

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
