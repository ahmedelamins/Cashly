import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Stack,
    Paper,
    MenuItem,
    Card
} from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const categories = ['Utility', 'Food', 'Fun', 'Shopping', 'Other'];

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([])
    const [openDelete, setOpenDelete] = useState(null);
    const [openEdit, setOpenEdit] = useState(null);
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        category: ""
    });

    //clear form
    const clearForm = () => {
        setFormData({
            title: "",
            amount: "",
            date: "",
            category: ""
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };
    
    //open add dialog
    const handleOpenAddExpense = () => {
        setOpenAddExpense(true);
    }

    //close add dialog
    const handleCloseAddExpense = () => {
        setOpenAddExpense(false);
        clearForm();
    }  

    //close edit dialog
    const handleCloseEditExpense = () => {
        setOpenEdit(false);
        clearForm();
    }  
        
    //grab expenses
    const fetchExpenses = async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.get('/expense');

            setExpenses(response.data.data);
            setLoading(false);

        } catch (error) {
            toast.error(error.response.data || "Connection error");
            setLoading(false);
        }
    }

    //submit expense
    const handleAddExpenseSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/expense', {
                title: formData.title,
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category,
            });

            toast.success(response.data.message);
            setLoading(false);
            handleCloseAddExpense();
            fetchExpenses();
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable. Check your connection.");
            } else {
                toast.error("An unexpected error occured.");
            }
            setLoading(false);
        }
    };     

    // Open delete dialog and store the ID of the expense
    const handleOpenDelete = (id) => {
        setOpenDelete(id);
    }

    //delete expense
    const handleDeleteExpense = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.delete(`/expense/${openDelete}`);

            setLoading(false);
            setOpenDelete(null);

            toast.success(response.data.message);

            fetchExpenses(); //refresh

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable. Check your connection.");
            } else {
                toast.error("An unexpected error occured.");
            }
            setLoading(false);
        }
    };

    //open edit dialog and store id
    const handleOpenEdit = (expense) => {
        setFormData({
            title: expense.title,
            amount: expense.amount,
            date: expense.date,
            category: expense.category
        });

        setOpenEdit(expense.id);
    };        

    //edit expense
    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await axiosInstance.put(`/expense/${openEdit}`, {
                title: formData.title,
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category,
            }); 

            setLoading(false);
            setOpenEdit(null);

            toast.success(response.data.message);

            fetchExpenses();
            clearForm();
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable. Check your connection.");
            } else {
                toast.error("An unexpected error occured.");
            }
            setLoading(false);
        }
    }

    //main load 
    useEffect(() => {
        fetchExpenses();
    }, []);
    
    //category totals
    const getCategoryTotals = () => {
        return categories.map((category) => {
            return expenses
                .filter((expense) => expense.category === category)
                .reduce((total, expense) => total + expense.amount, 0);
        });
    };

    const donutData = {
        labels: categories, 
        datasets: [
            {
                data: getCategoryTotals(),
                backgroundColor: ['#f44336', '#64b5f6', '#515785', '#ffb74d', '#629464'],
                hoverOffset: 5,
            },
        ],
    };

    const donutOptions = {
        responsive: true,        
        cutout: '50%', 
    };

    //greeting
    const goodTime = () => {
        const hr = new Date().getHours();

        if (hr >= 0 && hr < 12) {
            return "Good morning";
        } else if (hr >= 12 && hr <= 15) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    const greeting = goodTime();
    
    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }} >
            <Typography variant="h4" gutterBottom sx={{ letterSpacing: '0.1em', textAlign: 'left' }}>
                {`${greeting}, ${Username}!`}
            </Typography>
            <Button
                variant="contained"
                onClick={handleOpenAddExpense}
                startIcon={<AddTaskRoundedIcon />}
                sx={{
                    mt: 2,
                    fontWeight: "540",
                    py: 1.4,
                    px: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}>
                Add Expense
            </Button>

            {/* chart and history containers */}
            <Grid container spacing={2} sx={{ mt: 2}}>
                {/* chart container*/}
                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Expenditure by category
                        </Typography>
                        <Box sx={{ width: { xs: '70%', md: '70%' }, mx: 'auto' }}>
                            {loading ? (
                                <CircularProgress />
                            ) : (expenses.length == 0 ? (
                                <Typography variant="body1">No data available</Typography>
                            ) : (
                                <Pie data={donutData} options={donutOptions} />
                            ))}
                        </Box>
                    </Paper>
                </Grid>


                {/* expense history container */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, maxHeight: '460px', overflowY: 'auto' }}>
                        <Typography variant="h6" sx={{ position: 'sticky', mb: 2, textAlign: 'center' }}>
                            Expense History
                        </Typography>
                        <Stack spacing={2}>
                            {loading ? (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <CircularProgress />
                                </Box>

                            ) : expenses.length > 0 ? (
                                expenses.map((expense, index) => (
                                    <Card key={index} elevation={3} sx={{ p: 2, maxWidth: '100%', mx: 'auto', width: '100%' }}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            flexDirection={{ xs: 'column', sm: 'row' }}
                                            textAlign={{ xs: 'center', sm: 'left' }}>

                                            <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                                                <Typography variant="h6">
                                                    {expense.title}
                                                </Typography>
                                                <Typography variant="body" color="text.secondary">
                                                    {new Date(expense.date).toLocaleDateString()}
                                                </Typography>
                                            </Box>

                                            <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 0, sm: 2 }}>
                                                <Typography variant="h6" color="primary" sx={{ mr: { sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                                                   {expense.amount.toFixed(2)} SDG
                                                </Typography>
                                                <Button onClick={() => handleOpenEdit(expense)} variant="contained" startIcon={<EditIcon />}
                                                    sx={{
                                                        mr: { xs: 0, sm: 1 },
                                                        mb: { xs: 1, sm: 0 },
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}>
                                                    Update
                                                </Button>
                                                <Button onClick={() => handleOpenDelete(expense.id)} variant="contained" color="error"
                                                    startIcon={<DeleteIcon />}
                                                    sx={{
                                                        mb: { xs: 1, sm: 0 },
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)',
                                                        }, }}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                        
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Category: {expense.category}
                                        </Typography>
                                    </Card>
                                ))
                            ) : (
                                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                                    No data available
                                </Typography>
                            )}
                        </Stack>

                    </Paper>
                </Grid>
            </Grid>

            {/* edit expense form dialog */}
            <Dialog maxWidth="xs" fullWidth open={openEdit} onClose={handleCloseEditExpense}>
                <DialogTitle sx={{ textAlign: 'center' }}>{loading ? "Updating.." : "Update expense"}</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? <CircularProgress /> : (
                        <Box component="form" onSubmit={handleUpdateExpense}>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
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
                                required
                                value={formData.amount}
                                onChange={handleChange}
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
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                margin="dense"
                                name="date"
                                label="Date"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                            <DialogActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleCloseEditExpense}>
                                    Discard
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit">
                                    submit
                                </Button>
                            </DialogActions>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* delete dialog*/}
            <Dialog
                maxWidth="xs"
                fullWidth
                open={openDelete !== null}
                onClose={() => setOpenDelete(null)}>
                <DialogTitle sx={{ textAlign: 'center' }}> Delete?</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <DialogActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Button variant="outlined" onClick={() => setOpenDelete(null)}>
                                cancel
                            </Button>
                            <Button onClick={handleDeleteExpense} variant="contained" color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    )}
                </DialogContent>
            </Dialog>

            {/* new expense form dialog */}
            <Dialog maxWidth="xs" fullWidth open={openAddExpense} onClose={handleCloseAddExpense}>
                <DialogTitle sx={{ textAlign: 'center' }}>{ loading? "Adding expense.." : "New Expense" }</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? <CircularProgress /> : (
                        <Box component="form" onSubmit={handleAddExpenseSubmit}>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
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
                                required
                                value={formData.amount}
                                onChange={handleChange}
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
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                margin="dense"
                                name="date"
                                label="Date"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                            <DialogActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleCloseAddExpense}>
                                    Discard
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit">
                                    submit
                                </Button>
                            </DialogActions>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>            
        </Box>
    );
}

export default HomePage;
