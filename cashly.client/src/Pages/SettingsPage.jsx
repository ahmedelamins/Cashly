import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";

const SettingsPage = () => {

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [formData, setFormData] = useState({ password: '' });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
                        onClick={() => setPasswordOpen(true)}
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

            <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 2 }}>
                        <TextField
                            margin="dense"
                            name="password"
                            label="New Password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <DialogActions>
                            <Button variant="outlined" onClick={() => setPasswordOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Change
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>

        
    );
}

export default SettingsPage;
