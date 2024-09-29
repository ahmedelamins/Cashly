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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };
    //update expense
    const handleEditExpense = async (e) => {
        e.preventDefault();

        console.log("Editing this shitttt :)")
    }
    //open add dialog
    const handleOpenAddExpense = () => {
        setOpenAddExpense(true);
    }

    //close add dialog
    const handleCloseAddExpense = () => {
        setOpenAddExpense(false);
        setFormData({ title: "", amount: "", date: "", category: "" }); //reset formData
    }   

    //grab expenses
    const fetchExpenses = async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.get('/expense');
            setTimeout(() => {
                setExpenses(response.data.data);
                setLoading(false);
            }, 900);
        } catch (error) {
            toast.error(error.response.data || "Connection error");
            setTimeout(() => {
                setLoading(false);
            }, 900);
        }
    }

    //submit expense
    const handleAddExpenseSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const expenseData = {
                title: formData.title,
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category,
            }

            const response = await axiosInstance.post('/expense', expenseData);

            setTimeout(() => {
                toast.success(response.data.message);
                setLoading(false);
                handleCloseAddExpense();
                fetchExpenses();                                
            }, 900);
            

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else if (error.request) {
                toast.error("Server is unreachable. Check your connection.");
            } else {
                toast.error("An unexpected error occured.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 900);
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

            setTimeout(() => {
                setLoading(false);
                setOpenDelete(null);

                toast.success(response.data.message);
                fetchExpenses(); //refresh
            }, 900);

        } catch (error) {
            toast.error(error.response.data);
            setTimeout(() => {
                setLoading(null);
            }, 900)
        }
    };

    const handleOpenEdit = () => {

    }

    //main load 
    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }} >
            <Typography variant="h4" gutterBottom sx={{ letterSpacing: '0.10em', textAlign: 'left' }}>
                Hello, {Username}!
            </Typography>
            <Button
                variant="contained"
                onClick={handleOpenAddExpense}
                sx={{
                    mt: 3,
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
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* chart container*/}
                <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Expenditure
                        </Typography>
                        <Box sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto' }}>
                            <h5> Chart Container here</h5>
                        </Box>
                    </Paper>
                </Grid>

                {/* expense history container */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, maxHeight: '480px', overflowY: 'auto' }}>
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
                                    <Card key={index} sx={{ p: 2, maxWidth: '100%', mx: 'auto', width: '100%' }}>
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

                                            <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }} flexDirection={{ xs: 'column', sm: 'row' }}>
                                                <Typography variant="h6" color="primary" sx={{ mr: { sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                                                    ${expense.amount.toFixed(2)}
                                                </Typography>
                                                <Button onClick={ } variant="contained" startIcon={<EditIcon />}
                                                    sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}>
                                                    Edit
                                                </Button>
                                                <Button onClick={() => handleOpenDelete(expense.id)} variant="contained" color="error"
                                                    startIcon={<DeleteIcon />}>
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
                                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                                    Nothing to see here..
                                </Typography>
                            )}
                        </Stack>

                    </Paper>
                </Grid>

            </Grid>
            {/* delete dialog*/}
            <Dialog open={openDelete !== null} onClose={() => setOpenDelete(null)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <DialogActions>
                                <Button variant="outlined" onClick={() => setOpenDelete(null)}>
                                    Discard
                                </Button>
                                <Button onClick={handleDeleteExpense} variant="contained" color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* new expense form dialog */}
            <Dialog open={openAddExpense} onClose={handleCloseAddExpense}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent>
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
                            <DialogActions>
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
