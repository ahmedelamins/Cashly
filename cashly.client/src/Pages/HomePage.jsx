import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Stack,
    Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    //open add new expense
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        category: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    const handleOpenAddExpense = () => {
        setOpenAddExpense(true);
    }

    const handleCloseAddExpense = () => {
        setOpenAddExpense(false);
        setFormData({ title: "", amount: "", date: "", category: "" }); //reset formData
    }

    const handleAddExpenseSubmit = async (e) => {
        e.preventDefault();

        try {            

            const expenseData = {
                title: formData.title,
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category,
            }

            console.log(expenseData);

            const response = await axiosInstance.post('/expense', expenseData);

            toast.success(response.data.message);

            handleCloseAddExpense();

        } catch (error) {
            toast.error(error.response?.data || 'Something went wrong');
        }
    };


    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }} >
            <Typography variant="h4">
                Hello, {Username}!
            </Typography>
            <Button
                variant="contained"
                onClick={handleOpenAddExpense}
                sx={{
                    mt: 3,
                    fontWeight: "540",
                    py: 1.4,
                    px: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}>
                New Expense
            </Button> 

            {/* chart and history containers */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* chart container*/}
                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Expenditure
                        </Typography>
                        <Box sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto' }}>
                            <h5> Chart Container here</h5>
                        </Box>
                    </Paper>
                </Grid>

                {/* expense history container*/}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, maxHeight: '740px', overFlowY: 'auto' }}>
                        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center'}}>
                            Recent History
                        </Typography>
                        <Stack spacing={2}>
                            <h5 style={{ textAlign: 'center' }} > Recent History here</h5>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* new expense form dialog*/}
            <Dialog open={openAddExpense} onClose={handleCloseAddExpense}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddExpenseSubmit}>
                        <TextField
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="amount"
                            label="Amount"
                            type="number"
                            fullWidth
                            required
                            value={formData.amount}
                            onChange={handleChange}
                        />      
                        <TextField
                            margin="dense"
                            name="category"
                            label="Category"
                            type="text"
                            //select
                            fullWidth
                            variant="outlined"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="date"
                            label="Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />                        
                        <DialogActions>
                        <Button
                                variant="outlined"
                                onClick={handleCloseAddExpense}>                            
                                Discard
                            </Button>
                            <Button
                                variant="contained"
                                type="submit">
                                submit
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default HomePage;

