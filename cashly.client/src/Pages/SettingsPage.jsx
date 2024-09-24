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
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const SettingsPage = () => {

    const navigate = useNavigate();

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [formData, setFormData] = useState({ password: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            //console.log(formData)

            const response = await axiosInstance.post(`/auth/change-password`, {
                password: formData.password
            });

            setTimeout(() => {
                setLoading(false);
                setPasswordOpen(false);

                toast.success(response.data.message);
            }, 900);
                    
            setFormData({ password: '' });

        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                const errorMessage = error.response?.data?.message || "Could not change password.";
                toast.error(errorMessage);
            }, 900);
        }
    };


    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = localStorage.getItem('userId');

        try {

            const response = await axiosInstance.delete(`/auth/delete-user/${userId}`);

            setTimeout(() => {
                setLoading(false);

                toast.success("Deleted account successfully!");
                localStorage.clear();  
            
                navigate('/');
            }, 1000);
            

        } catch (error) {
            toast.error(error.response.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };


    return (
        <Box sx={{ ml: 3 }} >
            <Box sx={{
                mt: 3,
                animation: 'fadeSlideUp 0.9s ease-in-out',
                '@keyframes fadeSlideUp': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                } }}>                
                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                    Manage Your Account
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', maxWidth: "300px", width: "100%", flexDirection: 'column' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setPasswordOpen(true)}
                        sx={{ mb: 2 }}

                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteUserOpen(true)}>
                        Delete Account
                    </Button>
                </Box>
            </Box>
            {/* delete account pop up*/}
            <Dialog open={deleteUserOpen} onClose={() => setDeleteUserOpen(true)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    {loading ? <CircularProgress /> : (

                        <Box component="form" onSubmit={handleDeleteAccount} sx={{ mt: 2 }}>
                             <DialogActions>
                                  <Button variant="outlined" onClick={() => setDeleteUserOpen(false)}>
                                      No, Keep it.
                                  </Button>
                                  <Button variant="contained" type="submit" color="primary">
                                      Yes, I'm sure.
                                     </Button>
                             </DialogActions>
                         </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* change password pop up*/ }
            <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    {loading ? <CircularProgress /> : (
                        <Box component="form" onSubmit={handleChangePassword}>
                            <TextField
                                margin="dense"
                                name="password"
                                label="New Password"
                                type="password"
                                fullWidth
                                required
                                value={formData.newPassword}
                                onChange={handleInputChange}
                            />
                            <DialogActions>
                                <Button variant="outlined" onClick={() => setPasswordOpen(false)}>
                                    Discard
                                </Button>
                                <Button variant="contained" type="submit" color="primary">
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Box>
                    ) }
                </DialogContent>
            </Dialog>            
        </Box>
    );
}

export default SettingsPage;
