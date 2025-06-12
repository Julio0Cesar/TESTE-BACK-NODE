import { Request, Response } from "express"
import { criarClienteNoBancoAsync, listarClientesDoBancoAsync } from "./cliente.service"
import { erroHandling } from "../../shared/errors/erro-handling"

export async function criarClienteAsync(req: Request, res: Response) {
  try {
    const novoCliente = await criarClienteNoBancoAsync(req.body)
    return res.status(201).json({ message: "Usuário criado com sucesso",novoCliente})

  } catch (error: any) {
    if (error instanceof erroHandling) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.error("Erro não tratado:", error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}


export async function listClients(req: Request, res: Response) {
  try {
    const clientes = await listarClientesDoBancoAsync()
    return res.status(200).json(clientes)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}