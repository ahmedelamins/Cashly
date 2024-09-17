import { Box, Typography} from '@mui/material'

const HomePage = () => {

    const username = localStorage.getItem('username'); //fetching username

    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    return (
        <Box>
            <Typography variant="h4">
                Welcome, {Username}!
            </Typography>
            <p> This is home</p>
        </Box>
    );
}

export default HomePage;