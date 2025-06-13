import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { RequisicaoAutenticada } from "./requisicao-autenticada"

const JWT_SECRET = process.env.JWT_SECRET || "segredoFracoLocal"

export function autenticarJWT(req: RequisicaoAutenticada, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET) as RequisicaoAutenticada["cliente"]
    req.cliente = payload
    next()
  } catch (err) {
    res.status(401).json({ message: "Token inválido" })
    return
  }
}
