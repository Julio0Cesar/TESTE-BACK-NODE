import { Request, Response } from "express";
import * as FaturaService from "./nota-fiscal.service";

export async function emitirNotaFiscal(req: Request, res: Response) {
  try {
    const notaFiscal = await FaturaService.emitirNotaFiscal(req.body);
    return res.status(201).json(notaFiscal);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Erro ao emitir nota fiscal" });
  }
}

export async function listarNotaFiscal(req: Request, res: Response) {
  try {
    const notasFiscais = await FaturaService.listarNotasFiscais()
    return res.status(200).json(notasFiscais)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}

export async function detalharNotaFiscal(req: Request, res: Response) {
  try {
    const { id } = req.params
    const nota = await FaturaService.buscarNotaPorId(id)

    if (!nota) {
      return res.status(404).json({ message: "Nota fiscal não encontrada" })
    }

    return res.status(200).json(nota)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno no servidor" })
  }
}