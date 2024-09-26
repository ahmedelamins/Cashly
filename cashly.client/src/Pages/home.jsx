import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper, Stack, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const mockExpenses = [
    { id: 1, title: 'Electricity Bill', amount: 100, date: '2024-09-01', category: 'Utility' },
    { id: 2, title: 'Groceries', amount: 87, date: '2024-09-02', category: 'Food' },
    { id: 3, title: 'Night out', amount: 64, date: '2024-09-03', category: 'Fun' },
    { id: 4, title: 'New Shoes', amount: 75, date: '2024-09-05', category: 'Shopping' },
    { id: 5, title: 'Savings Deposit', amount: 95, date: '2024-09-06', category: 'Other' },
    { id: 6, title: 'Savings Deposit', amount: 33, date: '2024-09-07', category: 'Other' },
];

const mockCategories = ['Utility', 'Food', 'Fun', 'Shopping', 'Other'];

const HomePage = () => {
    const [expenses, setExpenses] = useState(mockExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const username = localStorage.getItem('username') || 'User'; // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); // Capitalize first letter

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ title: "", amount: "", date: "", category: "" }); // Reset form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setExpenses([...expenses, { ...formData, id: expenses.length + 1 }]);
        handleClose();
    };

    useEffect(() => {
        // Calculate total expenses
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpenses(total);
    }, [expenses]);

    const categoryData = {
        labels: mockCategories,
        datasets: [
            {
                label: 'Expenses by Category',
                data: mockCategories.map((category) =>
                    expenses.filter((expense) => expense.category === category)
                        .reduce((acc, expense) => acc + expense.amount, 0)
                ),
                backgroundColor: ['#f44336', '#64b5f6', '#515785', '#ffb74d', '#629464'],
                hoverOffset: 4,
            },
        ],
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
                            <Pie data={categoryData} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Expense History container*/}
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
                                            <IconButton aria-label="delete">
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
                        component="form" onSubmit={handleSubmit}>

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
                            {mockCategories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
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