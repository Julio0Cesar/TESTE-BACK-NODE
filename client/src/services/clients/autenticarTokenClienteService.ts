import axiosInstance from "../../configs/axiosConfig"
import { getErrorMessage } from "../../utils/errorHandler"
import { getToken } from "../../utils/tokenStorage"


export const autenticarTokenUsuario = async () => {
    try {
        const response = await axiosInstance.get("auth/validar", {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
        return response.data
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}