import { Request, Response } from "express"
import { registrarNovoCliente, listarClientes } from "./cliente.service"
import { ClienteDTO } from "./dto/create-cliente.dto"

export async function handleCriarCliente(req: Request<{}, {}, ClienteDTO>, res: Response) {
  const novoCliente = await registrarNovoCliente(req.body)
  res.status(201).json({ message: "Usuário criado com sucesso", novoCliente })
  return
}

export async function handleListarClientes(req: Request, res: Response) {
  const clientes = await listarClientes()
  res.status(200).json(clientes)
  return
}