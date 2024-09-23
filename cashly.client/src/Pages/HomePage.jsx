import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper, Stack, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../utils/axiosInstance';
import { toastify } from 'react-toastify';

const HomePage = () => {
    const username = localStorage.getItem('username') || 'User';
    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category');
                setCategories(response.data.data); 
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        const fetchExpenses = async () => {
            try {
                const response = await axiosInstance.get('/expense');
                setExpenses(response.data.data);  // Real expenses from backend
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchCategories();
        fetchExpenses();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ title: "", amount: "", date: "", category: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/expense', formData);
            setExpenses([...expenses, response.data.data]);  
            handleClose();
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/expense/${id}`);
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    if (loading) return <div>Loading..</div>;
    if (error) return <div>Error: {error}</div>;

    // Ensure categories and expenses are non-empty before creating chart data
    const categoryData = categories.length > 0 && expenses.length > 0 ? {
        labels: categories.map((category) => category.name),  // Map categories to their names
        datasets: [
            {
                label: 'Expenses by Category',
                data: categories.map((category) =>
                    expenses.filter((expense) => expense.category === category.name)
                        .reduce((acc, expense) => acc + expense.amount, 0)
                ),  // Sum up expenses by category
                backgroundColor: ['#f44336', '#64b5f6', '#515785', '#ffb74d', '#629464'],
                hoverOffset: 4,
            },
        ],
    } : null;

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
                }}>
                New Expense
            </Button>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Chart container */}
                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Expenses by Category
                        </Typography>
                        <Box sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto' }}>
                            {categoryData ? (
                                <Pie data={categoryData} />  // Render chart if data is available
                            ) : (
                                <Typography>Nothing yet.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Expense History container */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, maxHeight: '470px', overflowY: 'auto' }}>
                        <Typography variant="h6" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                            Recent Transactions
                        </Typography>
                        <Stack spacing={2}>
                            {expenses.map((expense) => (
                                <Card key={expense.id}>
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="body1">
                                                {expense.title} - ${expense.amount}
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
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Dialog for new expense */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", mt: 2 }}
                        onSubmit={handleSubmit}
                    >
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
                            inputProps={{ min: 0 }}
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
                    <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HomePage;
