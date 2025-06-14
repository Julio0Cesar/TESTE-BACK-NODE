import Joi from "joi"
import { validarCNPJ } from "../../../shared/utils/validar-cnpj"

export const criarClienteSchema = Joi.object({
  nome: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        "string.base": "Nome deve ser um texto",
        "string.min": "Nome deve ter pelo menos 3 caracteres",
        "string.max": "Nome pode ter no máximo 100 caracteres",
        "any.required": "Nome é obrigatório",
      }),

  email: Joi.string()
      .email()
      .max(100)
      .required()
      .messages({ 
        "string.base": "Email deve ser um texto",
        "string.email": "Email inválido",
        "string.max": "Email pode ter no máximo 100 caracteres",
        "any.required": "Email é obrigatório",
      }),
  
  cnpj: Joi.string()
      .required()
      .custom((value, helpers) => {
        return !validarCNPJ(value) ? helpers.error("any.invalid") : value
      }, "Validação real de CNPJ")
      .messages({ 
        "string.base": "CNPJ deve ser uma string",
        "any.invalid": "CNPJ inválido",
        "any.required": "CNPJ é obrigatório",
      }),

  senha: Joi.string()
      .min(6)
      .max(100)
      .required()
      .messages({
        "string.base": "Senha deve ser um texto",
        "string.min": "Senha deve ter pelo menos 6 caracteres",
        "string.max": "Senha pode ter no máximo 100 caracteres",
        "any.required": "Senha é obrigatória",
      }),
})
