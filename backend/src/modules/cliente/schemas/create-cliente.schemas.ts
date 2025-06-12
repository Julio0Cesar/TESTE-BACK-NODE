import Joi from "joi"
import { validarCNPJ } from "../../../shared/Utils/validar-cnpj"

export const createClienteSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  cnpj: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!validarCNPJ(value)) {
        return helpers.error("any.invalid")
      }
      return value
    }, "Validação real de CNPJ")
    .messages({ "any.invalid": "CNPJ inválido" }),
  senha: Joi.string().min(6).max(100).required(),
})
