import Joi from "joi"
import { validarNCM } from "../../../shared/utils/validar-ncm"
import { validarCFOP } from "../../../shared/utils/validar-cfop"

export const createProdutoSchema = Joi.object({
    nome: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({ 
            "string.base": "Nome deve ser um texto",
            "string.min": "Nome deve ter pelo menos 1 caractere",
            "string.max": "Nome pode ter no máximo 100 caracteres",
            "any.required": "Nome é obrigatório",
        }),

    ncm: Joi.string()
        .required()
        .max(8)
        .custom((ncm, helpers) => {
            return !validarNCM(ncm) ? helpers.error("any.invalid") : ncm
        }, "Validação real de NCM")
        .messages({ 
            "any.invalid": "NCM inválido",
            "string.base": "NCM deve ser uma string",
            "string.max": "NCM deve ter no máximo 8 dígitos",
            "any.required": "NCM é obrigatório",
        }),

    cfop: Joi.string()
        .required()
        .max(4)
        .custom((cfop, helpers) => {
            return !validarCFOP(cfop) ? helpers.error("any.invalid") : cfop
        }, "Validação real de CFOP")
        .messages({ 
            "any.invalid": "CFOP inválido",
            "string.base": "CFOP deve ser uma string",
            "string.max": "CFOP deve ter no máximo 4 dígitos",
            "any.required": "CFOP é obrigatório",
        }),

    preco: Joi.number()
        .required()
        .positive()
        .precision(2)   
        .messages({
            "number.base": "Preço deve ser um número",
            "number.positive": "Preço deve ser maior que zero",
            "number.precision": "Preço deve ter no máximo duas casas decimais",
            "any.required": "Preço é obrigatório",
        }),     
        
    industrializado: Joi.boolean()
        .required() 
        .messages({
            "boolean.base": "Industrializado deve ser um True ou False",
            "any.required": "Industrializado é obrigatório",
        }), 
})