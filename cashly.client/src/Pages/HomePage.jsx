import { Box, Typography} from '@mui/material'

const HomePage = () => {

    const username = localStorage.getItem('username'); //fetching username

    const Username = username.
    return (
        <Box>
            <Typography variant="h4">
                Welcome, {username}!
            </Typography>
            <p> This is home</p>
        </Box>
    );
}

export default HomePage;