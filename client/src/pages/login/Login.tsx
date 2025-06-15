import { Card, CardContent, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { criarHandleChange } from '../../utils/formUtils';
import { autenticarLoginCliente } from '../../services/clients/autenticarLoginClienteService';

const Login = () => {
    const navigate = useNavigate()
    const {storeToken} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState ({
      email:'',
      senha:''
    })
  
    const handleChange = criarHandleChange(setFormData)
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>  {
      e.preventDefault()
        setError("")
        setLoading(true)
        
      try {
        const response = await autenticarLoginCliente(formData.email, formData.senha)
        storeToken(response.novoLogin.token)
  
        navigate("/")
        } catch (error ) {
            setError((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ minWidth: 400, padding: 2, maxWidth: 600 }}>
        <CardContent>
        <div className='flex justify-between'>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Typography variant="h5" gutterBottom className="cursor-pointer" onClick={()=> navigate("/")}>
                Retornar
            </Typography>
        </div>
          <Box component="form" onSubmit={handleLogin} noValidate autoComplete="off">
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                name='email'
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                name='senha'
                value={formData.senha}
                onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type='submit'
              sx={{ marginTop: 2 }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <div className='mt-4'>
                {error && <p className="text-red-500 mb-4">{error}</p>}
            </div>
            <div className='flex my-4'>
                <h6 className='mr-1'>Novo na Plataforma? </h6><Link href="#" onClick={()=> navigate("/criarConta")}>Crie sua conta aqui</Link>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>
    )
}

export default Login