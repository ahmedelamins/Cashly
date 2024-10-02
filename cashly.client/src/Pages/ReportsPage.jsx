import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';

const ReportsPage = () => {
    // Placeholder state for expenses
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [mostExpensiveCategory, setMostExpensiveCategory] = useState('');
    const [averageSpending, setAverageSpending] = useState(0);

    useEffect(() => {        
        setTotalExpenses(3500);
        setMostExpensiveCategory('Food');
        setAverageSpending(500);
    }, []);

    return (
        <Box sx={{ mt: 3, mb: 2, p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ letterSpacing: '0.08em', textAlign: 'left' }}>
                Expense Analytics
            </Typography>

            <Grid container spacing={5}>
                {/* Total Expenses Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Total Expenses</Typography>
                            <Typography variant="h4" color="success">${totalExpenses}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </Box>
    );
}

export default ReportsPage;
