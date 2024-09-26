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
import { jwtDecode } from 'jwt-decode';

const SettingsPage = () => {

    const navigate = useNavigate();

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [usernameOpen, setUsernameOpen] = useState(false);
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //change password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/change-password', {
                password: formData.password
            });

            setTimeout(() => {
                setLoading(false);
                setPasswordOpen(false);

                toast.success(response.data.message);
            }, 900);
                    
            setFormData("");
        } catch (error) {
            toast.error("Could not change password");
            setTimeout(() => {
                setLoading(false);
            }, 900);
        }
    };

    //get new username 
    const setNewUsername = (newUsername) => {
        
        localStorage.setItem('username', newUsername); //set new username
    }
    //change username
    const handleChangeUsername = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newUsername = formData.username;

            const response = await axiosInstance.post('/auth/change-username', {
                username: formData.username
            });
            
            setTimeout(() => {
                setLoading(false);
                setUsernameOpen(false);
             
                toast.success(response.data.message);
            },900);

            setNewUsername(newUsername);
            setFormData("");
        } catch (error) {
            toast.error("Something went wrong");
            setTimeout(() => {
                setLoading(false);
            }, 900);
        }
    }

    //delete account
    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = localStorage.getItem('userId');

        try {

            const response = await axiosInstance.delete(`/auth/delete-user/${userId}`);

            setTimeout(() => {
                setLoading(false);

                toast.success(response.data.message);
                localStorage.clear();  
            
                navigate('/');
            }, 900);       

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
                mt: 5,
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
                        sx={{ mb: 2, mt: 2 }}>
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setUsernameOpen(true)}
                        sx={{ mb: 2, mt: 2 }}>
                        Change Username
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteUserOpen(true)}
                        sx={{ mb: 2, mt: 2 }}>
                        Delete Account
                    </Button>
                </Box>
            </Box>
            {/* delete account dialog*/}
            <Dialog open={deleteUserOpen} onClose={() => setDeleteUserOpen(false)}>
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
            {/* change username dialog*/}
            <Dialog open={usernameOpen} onClose={() => setUsernameOpen(false)}>
                <DialogTitle>Change Username</DialogTitle>
                <DialogContent>
                    {loading ? <CircularProgress /> : (
                        <Box component="form" onSubmit={handleChangeUsername}>
                            <TextField
                                margin="dense"
                                name="username"
                                label="New Username"
                                type="text"
                                fullWidth
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <DialogActions>
                                <Button variant="outlined" onClick={() => setUsernameOpen(false)}>
                                    Discard
                                </Button>
                                <Button variant="contained" type="submit" color="primary">
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Box> 
                    )}                                           
                </DialogContent>
            </Dialog>          

            {/* change password dialog*/ }
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
                                value={formData.password}
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
