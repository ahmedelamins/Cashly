import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper, Stack, IconButton } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const mockExpenses = [
    { id: 1, title: 'Electricity Bill', amount: 100, date: '2024-09-01', category: 'Utility' },
    { id: 2, title: 'Groceries', amount: 50, date: '2024-09-02', category: 'Food' },
    { id: 3, title: 'Movie Tickets', amount: 30, date: '2024-09-03', category: 'Fun' },
    { id: 4, title: 'New Shoes', amount: 70, date: '2024-09-05', category: 'Shopping' },
    { id: 5, title: 'Savings Deposit', amount: 100, date: '2024-09-06', category: 'Savings' },
];

const mockCategories = ['Utility', 'Food', 'Fun', 'Shopping', 'Savings'];

const HomePage = () => {
    const [expenses, setExpenses] = useState(mockExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const username = localStorage.getItem('username') || 'User'; // Fetching username
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1); // Capitalize first letter

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
                data: mockCategories.map((category) => expenses.filter((expense) => expense.category === category).reduce((acc, expense) => acc + expense.amount, 0)),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <Box sx={{ mt: 2, p: 2 }}>
            {/* Welcome Section */}
            <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
                Hello, {capitalizedUsername}!
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Donut Chart */}
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

                {/* Expense History */}
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
        </Box>
    );
};

export default HomePage;