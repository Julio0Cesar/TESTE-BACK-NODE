import { Button } from "@mui/material"
import DataTable from "../../components/DataTable"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const handleCompra=()=>{
        navigate("/notaFiscal")
    }
    return(
        <div className="p-10 pt-20 flex flex-col justify-center items-center">
            <DataTable>
            </DataTable>
                {user?(
                    <div className="flex flex-col">
                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                            sx={{ marginTop: 2 }}
                            onClick={()=> navigate("/criarProduto")}
                            >
                                Adicionar Produto
                        </Button>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                            sx={{ marginTop: 2 }}
                            onClick={handleCompra}
                            >
                                Comprar Produtos
                        </Button>
                    </div>
                ):(
                    <div></div>
                )}
        </div>
    )
}

export default Home