import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const SettingsPage = () => {
    const handleChangePassword = () => {
        console.log('Change Password Clicked');
    };

    const handleDeleteAccount = () => {
        console.log('Delete Account Clicked');
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 2} }>
                    Manage Your Account
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', maxWidth: "250px", width: "100%", flexDirection: 'column', w: "40%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePassword}
                        sx={{ mb: 2 }}
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SettingsPage;
