import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";

const SettingsPage = () => {
    const handleChangePassword = (e) => {
        console.log('Change Password Clicked');
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        try {
            toast.warning("ou are about to Delete Your Account!")

        } catch {
            toast.error("Something went wrong")
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5}}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                    Manage Your Account
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', maxWidth: "300px", width: "100%", flexDirection: 'column', w: "40%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePassword}
                        sx={{ mb: 2 }}>                    
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteAccount}>                    
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SettingsPage;
