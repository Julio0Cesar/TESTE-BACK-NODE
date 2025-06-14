import { Request, Response, NextFunction } from "express"
import { QueryFailedError } from "typeorm"
import { logger } from "../logs/logger"
import { HttpError } from "../../core/error/HttpError"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    logger.error(`${err.message}, (status: ${err.statusCode})`)
    res.status(err.statusCode).json({ message: err.message })
    return
  }
  
    // Trata erros do banco
  if (err instanceof QueryFailedError) {
    logger.error(`Erro de banco de dados: ${err}`)
    res.status(400).json({message: "Erro de banco de dados",detalhes: err.message,})
    return
  }

  logger.error(`Erro nao tratado: ${err}`)
  res.status(500).json({ message: "Erro interno no servidor" })
}

// Trata erros de endpoint nao encontrado
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  logger.error(`Rota ${req.method} ${req.originalUrl} nao encontrada`)
  res.status(404).json({ message: `Rota ${req.method} ${req.originalUrl} nao encontrada` })
}