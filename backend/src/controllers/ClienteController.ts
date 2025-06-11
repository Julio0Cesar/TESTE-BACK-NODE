import { Request, Response } from "express"
import * as ClientsService from "../services/ClienteService"

export async function createClient(req: Request, res: Response) {
  try {
    const novoCliente = await ClientsService.createClient(req.body)
    return res.status(201).json(novoCliente)
  } catch (error: any) {
    if (error.message === "Campos obrigatórios faltando") {
      return res.status(400).json({ message: error.message })
    }
    if (error.message === "Cliente já cadastrado") {
      return res.status(409).json({ message: error.message })
    }
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