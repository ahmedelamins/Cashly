import { Box, Typography} from '@mui/material'

const HomePage = () => {

    const username = localStorage.getItem('username'); //fetching username

    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <Box sx = {{ mt: 4} }>
            <Typography variant="h4">
                Hello, {Username}.
            </Typography>
            <p> This is home</p>
        </Box>
    );
}

export default HomePage;