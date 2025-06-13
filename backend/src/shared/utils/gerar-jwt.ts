import jwt, { SignOptions, Secret } from "jsonwebtoken"
import dotenv from "dotenv"
import ms, { StringValue } from "ms"

dotenv.config()

const JWT_SECRET: Secret = process.env.JWT_SECRET || "segredoFracoLocal"

export function gerarToken(payload: object, expiresIn: StringValue = "1h"): string {
  const expiresInMs = ms(expiresIn)

  const options: SignOptions = { expiresIn: Math.floor(expiresInMs / 1000) }

  return jwt.sign(payload, JWT_SECRET, options)
}
