import { Request, Response } from "express"
import { registrarNovoCliente, listarClientes } from "./cliente.service"
import { ClienteDTO } from "./dto/create-cliente.dto"
import { logger } from "../../shared/logs/logger"
import { mapClienteToOutput } from "./dto/output-cliente.dto"

// POST: /clients
export async function handleCriarCliente(req: Request<{}, {}, ClienteDTO>, res: Response) {
  const novoCliente = await registrarNovoCliente(req.body)
  logger.info(`Cliente: ${novoCliente.nome}, criado com sucesso (200 OK)`)
  res.status(201).json({ message: "Cliente criado com sucesso", novoCliente: mapClienteToOutput(novoCliente)})
}

// GET: /clients
export async function handleListarClientes(req: Request, res: Response) {
  const clientes = await listarClientes()
  logger.info("Clientes listados com sucesso (200 OK)")
  res.status(200).json(clientes)
}