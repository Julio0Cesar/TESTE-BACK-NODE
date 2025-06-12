import { Request, Response, NextFunction } from "express"
import { QueryFailedError } from "typeorm"

export class HttpError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  // trata erro de banco
  if (err instanceof QueryFailedError) {
    res.status(400).json({
      message: "Erro de banco de dados",
      detalhes: err.message,
    })
    return
  }
  
  console.error("Erro não tratado:", err)
  res.status(500).json({ message: "Erro interno no servidor" })
}