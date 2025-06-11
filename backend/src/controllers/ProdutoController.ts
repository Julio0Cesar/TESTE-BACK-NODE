import { Request, Response } from "express"
import * as ProdutoService from "../services/ProdutoService"

export async function criarProduto(req: Request, res: Response) {
  try {
    const novoProduto = await ProdutoService.criarProduto(req.body)
    return res.status(201).json(novoProduto)
  } catch (error: any) {
    if (error.message === "Campos obrigatórios faltando") {
      return res.status(400).json({ message: error.message })
    }
    if (error.message === "Produto já cadastrado") {
      return res.status(409).json({ message: error.message })
    }
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}

export async function listarProdutos(res: Response) {
  try {
    const clientes = await ProdutoService.listarProdutos()
    return res.status(200).json(clientes)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}