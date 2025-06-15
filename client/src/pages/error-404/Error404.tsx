import { Box, Typography } from "@mui/material"

const Error404 = () => {
    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"> 
            <div>
                <Typography variant="h1" gutterBottom className="text-center">
                    ERROR 404
                </Typography>
                <Typography variant="h4" gutterBottom className="text-center">
                    Pagina não encontrada
                </Typography>
            </div>
        </Box>
    )
}

export default Error404