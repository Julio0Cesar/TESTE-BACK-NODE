import { Request, Response } from "express"
import { criarClientenoBancoAsync } from "./cliente.service"

export async function criarClienteAsync(req: Request, res: Response) {
  try {
    const novoCliente = await criarClientenoBancoAsync(req.body)
    return res.status(201).json(novoCliente)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}


export async function listClients(req: Request, res: Response) {
  try {
    const clientes = await ClientsService.listClients()
    return res.status(200).json(clientes)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}