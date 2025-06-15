import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { removeToken } from "../utils/tokenStorage"

const NavBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = useAuth()

    if (location.pathname === '/criarConta' || location.pathname === '/login') return null

    const handleLogout = () => {
        removeToken()
        window.location.reload()
    }
    
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <span className="cursor-pointer inline" onClick={()=> navigate("/")}>
                    Store
                </span>
            </Typography>
            {user ? (
                <div>
                    <Button onClick={()=> navigate("/notaFiscal")} color="inherit">Ver Notas Fiscais</Button>
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </div>
            ) : (
                <Button onClick={()=> navigate("/login")} color="inherit">Login</Button>
            )}
            </Toolbar>
        </AppBar>
        </Box>
    )
}

export default NavBar