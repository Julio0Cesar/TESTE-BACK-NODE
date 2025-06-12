import { Request, Response } from "express"
import { listarProdutos, registrarNovoProduto } from "./produto.service"
import { ProdutoDTO } from "./dto/criar-produto.dto"

export async function handleCriarProduto(req: Request<{}, {}, ProdutoDTO>, res: Response) {
  const novoProduto = await registrarNovoProduto(req.body)
  res.status(201).json({ message: "Produto criado com sucesso", novoProduto })
  return
}

export async function handleListarProdutos(req: Request, res: Response) {
  const produtos = await listarProdutos()
  res.status(200).json(produtos)
}
