import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReportsPage = () => {
    // Placeholder state for expenses
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [mostExpensiveCategory, setMostExpensiveCategory] = useState('');
    const [averageSpending, setAverageSpending] = useState(0);
    const [weeklyExpenses, setWeeklyExpenses] = useState([500, 700, 800, 600, 900, 750, 650]);

    useEffect(() => {
        // Fetch the total expenses, most expensive category, and average spending here
        // For now, we'll use mock data
        setTotalExpenses(3500);
        setMostExpensiveCategory('Food');
        setAverageSpending(500);
    }, []);

    // Bar chart data for weekly expenses
    const barChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Expenses ($)',
                data: weeklyExpenses,
                backgroundColor: '#425f6e', // Red bars
                borderColor: 'rgba(255, 99, 132, 1)',      // Red border
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // This makes the chart adjust better to smaller screens
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Expenses',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ mt: 3, mb: 2, p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ letterSpacing: '0.08em', textAlign: 'left' }}>
                Expense Analytics
            </Typography>

            <Grid container spacing={3}>
                {/* Total Expenses Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Expenses</Typography>
                            <Typography variant="h4" color="primary">${totalExpenses}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Most Expensive Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Category with Most Expenses</Typography>
                            <Typography variant="h5" color="secondary">{mostExpensiveCategory}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Average Spending per Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Average Spending per Category</Typography>
                            <Typography variant="h5" color="success">${averageSpending}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bar Chart for Weekly Expenses */}
                <Grid item xs={12}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            {/* Box to make the chart container responsive */}
                            <Box sx={{ height: { xs: 300, sm: 400, md: 500 }, width: '100%' }}>
                                <Bar data={barChartData} options={barChartOptions} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsPage;
