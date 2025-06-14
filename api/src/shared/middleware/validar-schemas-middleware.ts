import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"
import { logger } from "../logs/logger"

export const validarSchemas = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    const detalhes = error.details.map((d) => d.message)
    logger.error(`Requisição inválida, detalhes: ${detalhes}`)
    res.status(400).json({ erro: "Requisição inválida", detalhes })
    return
  }
  next()
}
