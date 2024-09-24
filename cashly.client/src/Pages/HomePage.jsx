import { Box, Typography } from '@mui/material';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    return (
        <Box sx={{ mt: 1, mb: 1, p: 1 }} >
            <Box
                sx={{
                    animation: 'slideIn 1s ease-out',
                    '@keyframes slideIn': {
                        '0%': { transform: 'translateY(20px)', opacity: 0 },
                        '100%': { transform: 'translateY(0)', opacity: 1 },
                    }
                }}>
                <Typography variant="h4">
                    Hello, {Username}!
                </Typography>
            </Box>

        </Box>
    );
}

export default HomePage;

