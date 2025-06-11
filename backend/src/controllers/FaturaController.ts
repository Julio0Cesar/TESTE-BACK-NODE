import { Request, Response } from "express";
import * as InvoiceService from "../services/FaturaService";

export async function emitirNotaFiscal(req: Request, res: Response) {
  try {
    const notaFiscal = await InvoiceService.emitirNotaFiscal(req.body);
    return res.status(201).json(notaFiscal);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Erro ao emitir nota fiscal" });
  }
}
