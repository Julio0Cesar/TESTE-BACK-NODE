import { Request, Response } from "express";
import { listarNotaFiscalPorId, listarNotasFiscais, registrarNovaNotaFiscal } from "./nota-fiscal.service";
import { NotaFiscalDTO } from "./dto/criar-nota-fiscal.dto";

export async function handleEmitirNotaFiscal(req: Request<{}, {}, NotaFiscalDTO>, res: Response) {
  const novaNotaFiscal = await registrarNovaNotaFiscal(req.body)
  res.status(201).json({ message: "Nota Fiscal emitida com sucesso", novaNotaFiscal })
  return
}

export async function handleListarNotaFiscal(req: Request, res: Response) {
  const produtos = await listarNotasFiscais()
  res.status(200).json(produtos)
}

export async function handleDetalharNotaFiscal(req: Request, res: Response) {
  const { id } = req.params
  const produtos = await listarNotaFiscalPorId(id)
  res.status(200).json(produtos)
}