import axiosInstance from "../../configs/axiosConfig"
import { getErrorMessage } from "../../utils/errorHandler"

export const criarCliente = async (
    nome: string,
    email: string, 
    cnpj: string, 
    senha: string
) => {
    try {
        const response = await axiosInstance.post("clients", {
            nome: nome,
            email: email,
            cnpj: cnpj,
            senha: senha
        })
        
        return response.data
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}