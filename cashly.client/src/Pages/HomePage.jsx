import {
    Box,
    Typography,
    Button
} from '@mui/material';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }} >
            <Typography variant="h4">

                Hello, {Username}!
            </Typography>
            <Button
                variant="contained"
                sx={{
                    mt: 3,
                    fontWeight: "500",
                    py: 1.5,
                    px: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}>
                New Expense
            </Button>            

        </Box>
    );
}

export default HomePage;

