import axiosInstance from "../../configs/axiosConfig"
import { getErrorMessage } from "../../utils/errorHandler"

export const autenticarLoginCliente = async (email: string, senha: string) => {
    try {
        const response = await axiosInstance.post("auth/login", {
            email: email,
            senha: senha
        })
        return response.data
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}