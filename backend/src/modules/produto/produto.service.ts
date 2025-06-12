import { HttpError } from "../../shared/errors/error-middleware"
import { ProdutoDTO } from "./dto/criar-produto.dto"
import { buscarProdutoPorCfopOuNcm, buscarProdutos, salvarProduto } from "./produto.repository"

export async function registrarNovoProduto(data: ProdutoDTO) {
  const { ncm, cfop, nome } = data

  const produtoExistente = await buscarProdutoPorCfopOuNcm(nome, cfop, ncm)
  if(produtoExistente)
    throw new HttpError("Produto já registrado", 400)

  return await salvarProduto(data)
}

export async function listarProdutos() {
  return await buscarProdutos()
}

