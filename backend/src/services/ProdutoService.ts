import { Produto } from "../models/entities/Produto"
import { AppDataSource } from "../ormconfig"

interface ProdutoInput {
  nome?: string
  ncm?: string
  cfop?: string
  precoUnitario?: number
  industrializado?: boolean
  estoque?: number
  descricao?: string
}

export async function criarProduto(data: ProdutoInput) {
  const { nome, ncm, cfop, precoUnitario, industrializado, estoque, descricao } = data

  if (!nome || !ncm || !cfop) {
    throw new Error("Campos obrigatórios faltando")
  }

  const produtoRepo = AppDataSource.getRepository(Produto)

  const produtoExistente = await produtoRepo.findOneBy([
    { ncm },
    { cfop }
  ])

  if (produtoExistente) {
    throw new Error("Produto já cadastrado")
  }

  const novoProduto = produtoRepo.create({ nome, ncm, cfop, precoUnitario, industrializado, estoque, descricao })
  await produtoRepo.save(novoProduto)

  return novoProduto
}

export async function listarProdutos() {
  const produtoRepo = AppDataSource.getRepository(Produto)
  const produtos = await produtoRepo.find()
  return produtos
}