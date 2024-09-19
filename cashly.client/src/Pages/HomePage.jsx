import React from 'react';
import { Container, Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username

    const Username = username.charAt(0).toUpperCase() + username.slice(1);

    // Mock data for expense history
    const expenseHistory = [
        { id: 1, date: '2024-09-01', title: 'Groceries', category: 'Food' },
        { id: 2, date: '2024-09-05', title: 'Electricity Bill', category: 'Utilities' },
        { id: 3, date: '2024-09-10', title: 'Movie Tickets', category: 'Entertainment' },
        { id: 3, date: '2024-09-10', title: 'Movie Tickets', category: 'Entertainment' },
        { id: 3, date: '2024-09-10', title: 'Movie Tickets', category: 'Entertainment' },
        { id: 3, date: '2024-09-10', title: 'Movie Tickets', category: 'Entertainment' },
        
        // Add more mock data as needed
    ];

    // Handlers for edit and delete actions (replace with your actual logic)
    const handleEdit = (id) => {
        console.log(`Edit expense with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete expense with id: ${id}`);
    };

    return (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Container
                sx={{
                    width: '45%',
                }}
            >
                <Typography variant="h4">
                    Hello, {Username}.
                </Typography>
                {/* Placeholder for Donut Chart */}
                <Box
                    sx={{
                        height: '100%',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        mt: 2
                    }}
                >
                    <Typography variant="body1" color="textSecondary">
                        Donut Chart Placeholder
                    </Typography>
                </Box>
            </Container>

            {/* Expense History Container */}
            <Container
                sx={{
                    mt: 3,
                    width: '45%',
                    height: '500px',
                    overflow: 'auto',
                }}
            >
                <Box sx={{ mt: 2 }}>
                    {expenseHistory.map(expense => (
                        <Card key={expense.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6">{expense.title}</Typography>
                                <Typography color="textSecondary">{expense.date}</Typography>
                                <Typography color="textSecondary">{expense.category}</Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton onClick={() => handleEdit(expense.id)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(expense.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default HomePage;
