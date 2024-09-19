import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

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
        { id: 3, date: '2024-09-10', title: 'Movie Tickets', category: 'Entertainment' },
        // Add more mock data as needed
    ];

    return (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            
            <Container
                sx={{
                    width: '45%',                    
                    //animation: 'slideIn 1s ease-out',
                    //'@keyframes slideIn': {
                    //    '0%': { transform: 'translateY(20px)', opacity: 0 },
                    //    '100%': { transform: 'translateY(0)', opacity: 1 },
                    //}
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
                    //animation: 'slideIn 1s ease-out',
                    //'@keyframes slideIn': {
                    //    '0%': { transform: 'translateY(20px)', opacity: 0 },
                    //    '100%': { transform: 'translateY(0)', opacity: 1 },
                    //}
                }}
            >
                
                <Box sx={{ mt: 2 }}>
                    {expenseHistory.map(expense => (
                        <Card key={expense.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{expense.title}</Typography>
                                <Typography color="textSecondary">{expense.date}</Typography>
                                <Typography color="textSecondary">{expense.category}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default HomePage;
