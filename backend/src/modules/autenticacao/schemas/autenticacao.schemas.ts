import Joi from "joi";

export const criarAutenticacaoSchema = Joi.object({
    email: Joi.string()
        .email()
        .max(100)
        .required()
        .messages({ 
            "string.email": "Email inválido",
            "string.max": "Email pode ter no máximo 100 caracteres",
            "any.required": "Email é obrigatório",
        }),
    senha: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            "string.any": "Senha inválida",
            "string.max": "Senha pode ter no máximo 100 caracteres",
            "string.min": "Senha pode ter no mínimo 6 caracteres",
            "any.required": "Senha é obrigatório",
        })
})