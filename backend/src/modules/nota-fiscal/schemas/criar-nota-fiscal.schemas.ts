import Joi from "joi"

export const criarNotaFiscalSchema = Joi.object({

    clientId: Joi.string().uuid().required()
    .messages({
        "string.base": "Cliente inválido",
        "string.uuid": "Cliente deve ser um UUID válido",
        "any.required": "Cliente é obrigatório",
    }),

    products: Joi.array()
        .items(
        Joi.object({
            productId: Joi.string().uuid().required()
            .messages({
                "string.base": "Produto inválido",
                "string.uuid": "Produto deve ser um UUID válido",
                "any.required": "Produto é obrigatório",
            }),
            
            quantity: Joi.number().integer().min(1).required()
            .messages({
                "number.base": "Quantidade deve ser um número",
                "number.integer": "Quantidade deve ser um inteiro",
                "number.min": "Quantidade deve ser pelo menos 1",
                "any.required": "Quantidade é obrigatória",
            }),

            precoUnitario: Joi.forbidden(),
            icms: Joi.forbidden(),
            ipi: Joi.forbidden(),
            total: Joi.forbidden(),
        })
    )
    .min(1)
    .required(),

    valorTotal: Joi.forbidden(),   
    icmsTotal: Joi.forbidden(),    
    ipiTotal: Joi.forbidden(),    
    xml: Joi.forbidden(),    

})