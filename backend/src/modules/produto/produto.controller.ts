import { Request, Response } from "express"
import { listarProdutos, registrarNovoProduto } from "./produto.service"
import { ProdutoDTO } from "./dto/criar-produto.dto"
import { logger } from "../../shared/logs/logger"

// POST: /products
export async function handleCriarProduto(req: Request<{}, {}, ProdutoDTO>, res: Response) {
  const novoProduto = await registrarNovoProduto(req.body)
  logger.info(`Produto: ${novoProduto.nome}, criado com sucesso (200 OK)`)
  res.status(201).json({ message: "Produto criado com sucesso", novoProduto })
}

// GET: /products
export async function handleListarProdutos(req: Request, res: Response) {
  const produtos = await listarProdutos()
  logger.info("Produtos listados com sucesso (200 OK)")
  res.status(200).json(produtos)
}
