import { Box, Typography } from '@mui/material';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    return (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">
                Hello, {Username}!
            </Typography>

        </Box>
    );
}

export default HomePage;

