import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"

export const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const detalhes = error.details.map((d) => d.message)
      res.status(400).json({ erro: "Requisição inválida", detalhes })
      return
    }

    next()
  }
