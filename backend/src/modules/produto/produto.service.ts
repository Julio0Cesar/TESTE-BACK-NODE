import { HttpError } from "../../shared/errors/error-middleware"
import { ProdutoDTO } from "./dto/criar-produto.dto"
import { buscarProdutoPorCfopOuNcm, buscarProdutoPorId, buscarProdutos, salvarProduto } from "./produto.repository"

export async function registrarNovoProduto(data: ProdutoDTO) {
  await validarProdutoRegistradoPorCfopOuNcm(data.nome, data.cfop, data.ncm)
  return await salvarProduto(data)
}

export async function listarProdutos() {
  return await buscarProdutos()
}

export async function validarProdutoRegistradoPorCfopOuNcm(nome: string, cfop: string, ncm: string){
  const existente = await buscarProdutoPorCfopOuNcm(nome, cfop, ncm)
  if(existente)
    throw new HttpError("Produto já registrado", 400)
}

export async function validarProdutoNaoEncontradoPorId(id: string) {
    const existente = await buscarProdutoPorId(id)
    if (!existente) 
      throw new HttpError("Produto não encontrado", 400)
    return existente
}
