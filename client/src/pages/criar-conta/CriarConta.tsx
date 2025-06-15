import { Card, CardContent, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarHandleChange } from '../../utils/formUtils';
import { validarEmail, validarNome, validarSenha } from '../../utils/validacoesUsuario';
import { criarCliente } from '../../services/clients/criarClienteService';

const CriarConta = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) 
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cnpj: '',
        senha: ''
    })
    
    const handleChange = criarHandleChange(setFormData)
    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault()
        setError("")
        setLoading(true)
        
        const nomeError = validarNome(formData.nome.trim())
        const emailError = validarEmail(formData.email.trim())
        const senhaError = validarSenha(formData.senha)

        if (nomeError) return setError(nomeError)
        if (emailError) return setError(emailError)
        if (senhaError) return setError(senhaError)

        try {
            await criarCliente(formData.nome, formData.email.trim(), formData.cnpj.trim(), formData.senha)
            navigate("/login")
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
                        Criar Conta
                    </Typography>
                    <Typography variant="h5" gutterBottom className="cursor-pointer" onClick={()=> navigate("/")}>
                        Retornar
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
                        label="Email"
                        name="email" 
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="CNPJ"
                        name="cnpj" 
                        fullWidth
                        margin="normal"
                        value={formData.cnpj}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Senha"
                        name="senha" 
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        {loading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                    <div className='mt-4'>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                    </div>
                    <div className='flex mb-4'>
                        <h6 className='mr-1'>Já possui conta? </h6><Link href="#" onClick={()=> navigate("/login")}>faça login aqui</Link>
                    </div>
                </Box>
            </CardContent>
            </Card>
        </Box>
    )
}

export default CriarConta