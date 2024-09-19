import { Container, Box, Typography } from '@mui/material'

const HomePage = () => {

    const username = localStorage.getItem('username'); //fetching username

    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <Box sx={{ mt: 4 }}>
            <Container
                sx={{
                    animation: 'slideIn 1s ease-out',
                    '@keyframes slideIn': {
                        '0%': { transform: 'translateY(20px)', opacity: 0 },
                        '100%': { transform: 'translateY(0)', opacity: 1 },
                    }
                }}>
                
                <Typography variant="h4">
                    Hello, {Username}.
                </Typography>
                <p> This is home</p>
            </Container>
        </Box>
    );
}

export default HomePage;