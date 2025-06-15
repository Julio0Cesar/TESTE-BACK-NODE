import axiosInstance from "../../configs/axiosConfig"
import { getErrorMessage } from "../../utils/errorHandler"
import { getToken } from "../../utils/tokenStorage"

export const criarProduto = async (
    nome: string,
    ncm: string, 
    cfop: string, 
    preco: number,
    industrializado: boolean
) => {
    try {
        const response = await axiosInstance.post("products", {
            nome: nome,
            ncm: ncm,
            cfop: cfop,
            preco: preco,
            industrializado: industrializado
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        }
        )
        
        return response.data
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}