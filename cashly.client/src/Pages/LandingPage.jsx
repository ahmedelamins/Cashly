import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import vector from '../assets/vector.svg';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


const LandingPage = () => {
    const navigate = useNavigate();

    const [loginOpen, setLoginOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', {
                username: formData.username,
                password: formData.password,
            });

            //console.log(response.data); 

            const token = response.data.data; // destructing the response, access token

            if (token) {
                localStorage.setItem('token', token); // Store token

                //decoding token for username
                const decodedToken = jwtDecode(token)

               //console.log(decodedToken) //log the decoded token

                const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]

                //console.log(username);

                localStorage.setItem('username', username) //store username

                setLoginOpen(false);

                toast.success("Welcome Back!");

                navigate('/home');
            } else {
                throw new Error("No token returned from login!!");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert('Login Failed!');
        }
    };

    //register
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register', {
                username: formData.username,
                password: formData.password,
            });
           
            toast.success("Registered Successfuly! Please Log in."); //toast messagee

            setJoinOpen(false);
        } catch (error) {
            console.error("Registration failed", error);
        }
    };
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky" color="secondary" elevation={0} sx={{ py: 1, borderBottom: '2px solid #f4f6f7' }}>
                <Toolbar>
                    <Typography variant="h3" sx={{
                        flexGrow: 1,
                        fontFamily: 'Dancing Script',
                        fontWeight: "400",
                    }}>
                        Cashly
                    </Typography>
                    <Button variant="outlined"
                        color="primary"
                        sx={{ fontWeight: "600", ml: 4 }}
                        onClick={() => setAboutOpen(true)}>
                        <span style={{ marginRight: '8px' }}>About</span>
                        
                    </Button>
                    <Button variant="contained"
                        color="primary"
                        sx={{  mr: 3, ml: 3 }}
                        onClick={() => setLoginOpen(true)}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>


            <Container maxWidth="lg" sx={{
                flexGrow: 1,
                mt: 16,
                animation: 'slideIn 1s ease-out',
                '@keyframes slideIn': {
                    '0%': { transform: 'translateY(20px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 }, }}       
                }>
                <Grid container spacing={4} alignItems="center">
                    {/* Left side - Text */}
                    <Grid item xs={12} md={6} >
                        <Typography variant="h1" gutterBottom sx={{ letterSpacing: '0.10em', textAlign: 'left' }}>
                            Welcome to Cashly!
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', lineHeight: 1.6, textAlign: 'left' }}>
                            Track your expenses with ease and stay on top of your finances.
                            <br />
                            Manage your budget effortlessly, gain full control over your spending habits.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setJoinOpen(true)}
                            sx={{
                                mt: 4,
                                fontWeight: "500",
                                px: 4,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <span style={{ marginRight: '8px' }}>Get Started</span>
                            
                        </Button>
                    </Grid>

                    {/* Right side - SVG */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                src={vector}
                                alt="Cashly illustration"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '600px'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Footer Section */}
            <Box component="footer" sx={{ backgroundColor: '#f7fcfc', textAlign: "center", py: 3 }}>
                <Container maxWidth="md">
                    <Typography variant="body2" align="center">
                        &copy; {new Date().getFullYear()} Cashly. All rights reserved.
                    </Typography>
                </Container>
            </Box>

            {/* About Modal */}
            <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
                <DialogTitle>About</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 2 }}>
                        <Typography>
                            Track your expenses with ease and stay on top of your finances.
                            Manage your budget effortlessly, gain full control over your spending habits.
                        </Typography>
                        <DialogActions>
                            <Button variant="contained" onClick={() => setAboutOpen(false)} color="primary">
                                Cool
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Login Modal */}
            <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 2 }}>
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <DialogActions>
                            <Button variant ="outlined" onClick={() => setLoginOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Register Modal */}
            <Dialog open={joinOpen} onClose={() => setJoinOpen(false)}>
                <DialogTitle>Join</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 2 }}>
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <DialogActions>
                            <Button variant="outlined" onClick={() => setJoinOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Sign Up
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default LandingPage;