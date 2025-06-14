import { Request, Response } from "express";
import { listarNotaFiscalPorCliente, detalharNotaFiscalPorId, registrarNovaNotaFiscal } from "./nota-fiscal.service";
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto";
import { RequisicaoAutenticada } from "../../core/types/http-types";
import { logger } from "../../shared/logs/logger";

// POST: /invoices
export async function handleEmitirNotaFiscal(req: Request<{}, {}, NotaFiscalDTO>, res: Response) {
  const novaNotaFiscal = await registrarNovaNotaFiscal(req.body)
  logger.info("Nota Fiscal emitida com sucesso (200 OK)")
  res.status(201).json({ message: "Nota Fiscal emitida com sucesso", novaNotaFiscal })
}

// GET: /invoices
export async function handleListarNotasFiscais(req: RequisicaoAutenticada, res: Response) {
  const clienteId = req.cliente!.id

  const notaFiscal = await listarNotaFiscalPorCliente(clienteId)
  logger.info("Nota Fiscal listada com sucesso (200 OK)")
  res.status(200).json(notaFiscal)
}

// GET: /invoices/:id
export async function handleDetalharNotaFiscal(req: RequisicaoAutenticada, res: Response) {
  const { id } = req.params
  const clienteId = req.cliente!.id

  const notaFiscal = await detalharNotaFiscalPorId(id, clienteId)
  logger.info("Nota Fiscal detalhada com sucesso (200 OK)")
  res.status(200).json(notaFiscal)
}