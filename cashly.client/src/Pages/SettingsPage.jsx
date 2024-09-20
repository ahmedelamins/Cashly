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
import axiosInstance from '../utils/axiosInstance';
import { toast } from "react-toastify";

const SettingsPage = () => {

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [formData, setFormData] = useState({ password: '' });
    const [loading, setLoading] = useState(false); // Add loading state

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await axiosInstance.post('/auth/change-password', {
                password: formData.password,
            });

            toast.success("Password changed successfully!");
            setPasswordOpen(false);
            setFormData({ password: '' }); // Clear the form

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change the password.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {

           // if (window.confirm("Are You Sure?")) {
                const response = await axiosInstance.delete('/auth/delete-user');
                toast.success("Account deleted successfully.");
            //}
            
        } catch (error) {
            toast.error("Failed to delete account.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                    Manage Your Account
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', maxWidth: "300px", width: "100%", flexDirection: 'column' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setPasswordOpen(true)}
                        sx={{ mb: 2 }}
                        disabled={loading} // Disable while loading
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteAccount}
                        disabled={loading} // Disable while loading
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>

            {/* change password pop up*/ }
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
                            <Button variant="contained" type="submit" color="primary" disabled={loading}>
                                Change
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* delete account pop up*/}
            {/*<Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>*/}
            {/*    <DialogTitle>Change Password</DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 2 }}>*/}
            {/*            <TextField*/}
            {/*                margin="dense"*/}
            {/*                name="password"*/}
            {/*                label="New Password"*/}
            {/*                type="password"*/}
            {/*                fullWidth*/}
            {/*                required*/}
            {/*                value={formData.password}*/}
            {/*                onChange={handleInputChange}*/}
            {/*            />*/}
            {/*            <DialogActions>*/}
            {/*                <Button variant="outlined" onClick={() => setPasswordOpen(false)}>*/}
            {/*                    Cancel*/}
            {/*                </Button>*/}
            {/*                <Button variant="contained" type="submit" color="primary" disabled={loading}>*/}
            {/*                    Change*/}
            {/*                </Button>*/}
            {/*            </DialogActions>*/}
            {/*        </Box>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </Container>
    );
}

export default SettingsPage;
