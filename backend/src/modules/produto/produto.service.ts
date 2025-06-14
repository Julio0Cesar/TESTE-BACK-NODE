import { HttpError } from "../../core/error/HttpError"
import { ProdutoDTO } from "./dto/criar-produto.dto"
import { buscarProdutoPorCfopOuNcm, buscarProdutoPorId, buscarProdutos, salvarProduto } from "./produto.repository"

export async function registrarNovoProduto(data: ProdutoDTO) {
  await validarProdutoRegistrados(data.nome, data.cfop, data.ncm)
  return await salvarProduto(data)
}
export async function listarProdutos() {
  const produtos = await buscarProdutos()
  if (!produtos) throw new HttpError("Não existem clientes registrados", 400)
  return produtos
}

// Validacoes
export async function validarProdutoRegistrados(nome: string, cfop: string, ncm: string){
  const existente = await buscarProdutoPorCfopOuNcm(nome, cfop, ncm)
  if(existente) throw new HttpError("Produto já registrado", 400)
}
export async function validarProdutoNaoEncontrado(id: string) {
  const existente = await buscarProdutoPorId(id)
  if (!existente) throw new HttpError("Produto não encontrado", 400)
  return existente
}
