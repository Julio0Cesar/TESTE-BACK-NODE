import dotenv from "dotenv"
import jwt, { SignOptions, Secret } from "jsonwebtoken"
import ms, { StringValue } from "ms"

dotenv.config()
const JWT_SECRET: Secret = process.env.JWT_SECRET || "segredoFracoLocal"

export function gerarToken(payload: object, expiresIn: StringValue = "1h"): string {
  const options: SignOptions = { expiresIn: Math.floor(ms(expiresIn) / 1000) }
  return jwt.sign(payload, JWT_SECRET, options)
}
