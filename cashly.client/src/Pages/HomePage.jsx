import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper, Stack, IconButton } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
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
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    const [expenses, setExpenses] = useState(mockExpenses);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpenses(total);
    }, [expenses]);


    return (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">
                Hello, {Username}!
            </Typography>

        </Box>
    );
}

export default HomePage;