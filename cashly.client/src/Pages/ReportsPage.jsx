import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [loading, setLoading] = useState(false);
    const [totalExpenses, setTotalExpenses] = useState();
    const [averageSpending, setAverageSpending] = useState();
    const [mostExpensiveCategory, setMostExpensiveCategory] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState();

    //fetch monthly expenses
    const fetchMonthlyExpense = async () => {
        try {
            const userId = localStorage.getItem('userId');

            const response = await axiosInstance.get(`report/monthly-expenses/${userId}`);

            if (Array.isArray(response.data.data)) {
                if (response.data.data.length > 0) {
                    setMonthlyExpenses(response.data.data);
                } else {
                    toast.error("No monthly expense data available.");
                }
            } else {
                toast.error("Unexpected data format.");
            }
          
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message);
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable!");
            } else {
                toast.error("An unexpected error occured.");
            }
        }
    };

    //fetch total expenses
    const fetchTotalExpenses = async () => {
        setLoading(true);

        try {
            const userId = localStorage.getItem('userId');

            const response = await axiosInstance.get(`/report/total-expenses/${userId}`);
            setTimeout(() => {
                setTotalExpenses(response.data.data);
                setLoading(false);
            }, 600);
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable!");
            } else {
                toast.error("An unexpected error occured.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 600)
        }
    }

    //fetch average spending
    const fetchAverageSpending = async () => {
        setLoading(true);

        try {
            const userId = localStorage.getItem('userId');

            const response = await axiosInstance.get(`/report/average-expense/${userId}`);

            setTimeout(() => {
                setAverageSpending(response.data.data);
                setLoading(false);
            }, 600);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable!");
            } else {
                toast.error("An unexpected error occured.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 600)
        }
    }

    //fetch most expensive category
    const fetchMostExpensive = async () => {
        setLoading(false);

        try {
            const userId = localStorage.getItem('userId');

            const response = await axiosInstance.get(`report/most-expensive-category/${userId}`);
            
            setTimeout(() => {
                setLoading(false);

                setMostExpensiveCategory(response.data.data);
            }, 600);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable!");
            } else {
                toast.error("An unexpected error occured.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 600);            
        }
    }

    useEffect(() => {
        fetchTotalExpenses();
        fetchMostExpensive();
        fetchAverageSpending();
        fetchMonthlyExpense();
    }, []);

    // line chart data for the last 30 days
    const lineChartData = {
        labels: Array.from({ length: 30 }, (_, index) => `Day ${index + 1}`), // Labels for the last 30 days
        datasets: [
            {
                label: 'Expenses (SDG)',
                data: monthlyExpenses,
                borderColor: '#29576e', // Line color
                backgroundColor: 'rgba(41, 87, 110, 0.5)', // Area under the line
                pointBackgroundColor: '#29576e', // Point color
                fill: true, // Fill the area under the line
                tension: 0.3,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses for the Last 30 Days',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
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
                    <Card elevation={2} sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Expenses</Typography>
                            <Typography variant="h3" color="idk">{loading ? <CircularProgress /> : totalExpenses} SDG</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Most Expensive Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card elevation={2} sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Most Expensive Category</Typography>
                            <Typography variant="h3" color="idk">{loading ? <CircularProgress /> : mostExpensiveCategory}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Average Spending per Category Card */}
                <Grid item xs={12} sm={4}>
                    <Card elevation={2} sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Average Spending per Category</Typography>
                            <Typography variant="h3" color="idk">{loading ? <CircularProgress /> : averageSpending} SDG</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bar Chart for monthly Expenses */}
                <Grid item xs={12}>
                    <Card elevation={2} sx={{ height: '100%' }}>
                        <CardContent>
                            {/* Box to make the chart container responsive */}
                            <Box sx={{ height: { xs: 300, sm: 400, md: 500 }, width: '100%' }}>
                                <Line data={lineChartData} options={lineChartOptions} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsPage;
