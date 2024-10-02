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
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [mostExpensiveCategory, setMostExpensiveCategory] = useState('');
    const [averageSpending, setAverageSpending] = useState(0);
    const [weeklyExpenses, setWeeklyExpenses] = useState([500, 700, 800, 600, 900, 750, 650]);

    useEffect(() => {
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
                backgroundColor: '#29576e', // Red bars
                borderColor: 'rgba(255, 99, 132, 1)',      // Red border
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
            x: {
                barThickness: 15,
                maxBarThickness: 15,
            },
        },
    };

    return (
        <Box sx={{ mt: 2, mb: 2, p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ letterSpacing: '0.08em', textAlign: 'left', mb: '2' }}>
                Expense Analytics
            </Typography>

            <Grid container spacing={3}>
                {/* Total Expenses Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Expenses</Typography>
                            <Typography variant="h3" color="idk">${totalExpenses}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Most Expensive Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Most Expensive Category</Typography>
                            <Typography variant="h3" color="idk">{mostExpensiveCategory}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Average Spending per Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Average Spending per Category</Typography>
                            <Typography variant="h3" color="idk">${averageSpending}</Typography>
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
