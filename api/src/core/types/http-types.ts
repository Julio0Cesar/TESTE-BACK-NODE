import { Request } from "express"

export interface RequisicaoAutenticada extends Request {
  cliente?: {
    id: string
    email: string
    iat?: number
    exp?: number
  }
}
