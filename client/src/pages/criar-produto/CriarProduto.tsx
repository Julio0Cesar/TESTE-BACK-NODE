import { Card, CardContent, Typography, TextField, Button, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { criarHandleChange } from "../../utils/formUtils"
import { criarProduto } from '../../services/products/criarProdutoService';

const CriarProduto = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) 
    const [formData, setFormData] = useState({
        nome: '',
        ncm: '',
        cfop: '',
        preco: 0,
        industrializado: false,
    })
    
    const handleChange = criarHandleChange(setFormData)
    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const preco = Number(formData.preco)
            const industrializadoBool = String(formData.industrializado) === "on" ? true : false;

            await criarProduto(
                formData.nome,
                formData.ncm.trim(),
                formData.cfop.trim(),
                preco,
                industrializadoBool
            )
            navigate("/")
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ minWidth: 400, padding: 2, maxWidth: 600 }}>
            <CardContent>
                <div className='flex justify-between'>
                    <Typography variant="h5" gutterBottom>
                        Criar Produto
                    </Typography>
                </div>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        required
                        label="Nome"
                        name="nome" 
                        fullWidth
                        margin="normal"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="NCM"
                        name="ncm" 
                        fullWidth
                        margin="normal"
                        value={formData.ncm}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="CFOP"
                        name="cfop" 
                        fullWidth
                        margin="normal"
                        value={formData.cfop}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Preco"
                        name="preco" 
                        fullWidth
                        margin="normal"
                        value={formData.preco}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        name="industrializado"
                        checked={formData.industrializado}
                        onChange={handleChange}
                        />
                    }
                    label="Industrializado?"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        {loading ? "Criando produto..." : "Criar Produto"}
                    </Button>
                    <div className='mt-4'>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                    </div>
                </Box>
            </CardContent>
            </Card>
        </Box>
    )
}

export default CriarProduto