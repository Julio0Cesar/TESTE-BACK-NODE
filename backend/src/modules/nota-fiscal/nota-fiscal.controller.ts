import { Request, Response } from "express";
import { listarNotaFiscalPorId, listarNotasFiscais, registrarNovaNotaFiscal } from "./nota-fiscal.service";
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto";
import { RequisicaoAutenticada } from "../../shared/middleware/requisicao-autenticada";

export async function handleEmitirNotaFiscal(req: Request<{}, {}, NotaFiscalDTO>, res: Response) {
  const novaNotaFiscal = await registrarNovaNotaFiscal(req.body)
  res.status(201).json({ message: "Nota Fiscal emitida com sucesso", novaNotaFiscal })
  return
}

export async function handleListarNotaFiscal(req: Request, res: Response) {
  const notaFiscal = await listarNotasFiscais()
  res.status(200).json(notaFiscal)
  return
}

export async function handleDetalharNotaFiscal(req: RequisicaoAutenticada, res: Response) {
  const { id } = req.params
  const clienteId = req.cliente!.id

  const notaFiscal = await listarNotaFiscalPorId(id, clienteId)
  res.status(200).json(notaFiscal)
  return
}