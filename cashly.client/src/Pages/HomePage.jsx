import { Box, Typography } from '@mui/material';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    return (
        <Box sx={{ mt: 1, mb: 1, p: 1 }} >
            <Box
                sx={{
                    maxWidth: '300px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f0f4f8', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    animation: 'fadeSlideUp 0.5s ease-in-out',
                    '@keyframes fadeSlideUp': {
                        '0%': { opacity: 0, transform: 'translateY(10px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
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

