import { Request, Response } from "express";
import * as FaturaService from "../services/FaturaService";

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
