import Joi from "joi"
import { validarCNPJ } from "../../../shared/utils/validar-cnpj"

export const createClienteSchema = Joi.object({
  nome: Joi.string()
      .min(3)
      .max(100)
      .required(),

  email: Joi.string()
      .email()
      .max(100)
      .required()
      .messages({ "string.email": "Email inválido" }),
  
  cnpj: Joi.string()
      .required()
      .custom((value, helpers) => {
        return !validarCNPJ(value) ? helpers.error("any.invalid") : value
      }, "Validação real de CNPJ")
      .messages({ "any.invalid": "CNPJ inválido" }),

  senha: Joi.string()
      .min(6)
      .max(100)
      .required(),
})
