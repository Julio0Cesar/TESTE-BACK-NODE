import axiosInstance from "../../configs/axiosConfig"
import { getErrorMessage } from "../../utils/errorHandler"

export const obterProdutos = async () => {
    try {
        const response = await axiosInstance.get(`products`,{})
        return response.data
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}