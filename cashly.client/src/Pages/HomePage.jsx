import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper, Stack, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const HomePage = () => {
    const username = localStorage.getItem('username') || 'User';
    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, expensesResponse] = await Promise.all([
                    axiosInstance.get('/category'),
                    axiosInstance.get('/expense')
                ]);
                setCategories(categoriesResponse.data.data);
                setExpenses(expensesResponse.data.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ title: "", amount: "", date: "", category: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ensure the amount is a number
        const formattedData = {
            ...formData,
            amount: parseFloat(formData.amount)
        };

        console.log(formData);

        try {
            const response = await axiosInstance.post('/expense', formattedData);
            setExpenses(prevExpenses => [...prevExpenses, response.data.data]);
            handleClose();
            toast.success(response.data.message || "New expense added");
        } catch (error) {
            console.error('Error submitting expense:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to add expense. Please check your input and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/expense/${id}`);
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
            toast.success('Expense deleted successfully');
        } catch (err) {
            toast.error(err.response ? err.response.data.message : err.message);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>Loading...</Typography></Box>;
    if (error) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography color="error">Error: {error}</Typography></Box>;

    const categoryData = {
        labels: categories.map(category => category.name),
        datasets: [{
            label: 'Expenses by Category',
            data: categories.map(category =>
                expenses.filter(expense => expense.category === category.name)
                    .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
            ),
            backgroundColor: ['#f44336', '#64b5f6', '#515785', '#ffb74d', '#629464'],
            hoverOffset: 4,
        }],
    };

    return (
        <Box sx={{ mb: 1, p: 2 }}>
            <Typography variant="h4" textAlign={{ md: 'left' }}>
                Hello, {Username}!
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
                sx={{
                    mx: 2,
                    mt: 2,
                    p: "12px",
                    fontWeight: 550,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            >
                New Expense
            </Button>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Expenses by Category
                        </Typography>
                        <Box sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto' }}>
                            {expenses.length > 0 ? (
                                <Pie data={categoryData} />
                            ) : (
                                <Typography>No expenses yet.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, maxHeight: '470px', overflowY: 'auto' }}>
                        <Typography variant="h6" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                            Recent Transactions
                        </Typography>
                        <Stack spacing={2}>
                            {expenses.length > 0 ? (
                                expenses.map((expense) => (
                                    <Card key={expense.id}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body1">
                                                    {expense.title} - ${parseFloat(expense.amount).toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {expense.category} | {new Date(expense.date).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(expense.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography>No recent transactions.</Typography>
                            )}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
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
                            variant="outlined"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                        <TextField
                            margin="dense"
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="category"
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HomePage;