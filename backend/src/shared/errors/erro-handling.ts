import { Request, Response, NextFunction } from "express"

export class erroHandling extends Error {
  statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof erroHandling) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  console.error("Erro não tratado:", err)
  res.status(500).json({ message: "Erro interno no servidor" })
}