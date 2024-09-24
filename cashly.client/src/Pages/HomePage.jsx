import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

const HomePage = () => {
    const username = localStorage.getItem('username'); // Fetching username
    const Username = username.charAt(0).toUpperCase() + username.slice(1); //Capitalize first letter

    //open add new expense
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

    const handleOpenAddExpense = () => {
        setOpenAddExpense(true);
    }

    const handleCloseAddExpense = () => {
        setOpenAddExpense(false);
        setFormData({ title: "", amount: "", date: "", category: "" }); //reset formData
    }

    const handleAddExpenseSubmit = (e) => {
        e.preventDefault();

        console.log("new expense: ", formData);
    };

    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }} >
            <Typography variant="h4">
                Hello, {Username}!
            </Typography>
            <Button
                variant="contained"
                onClick={handleOpenAddExpense}
                sx={{
                    mt: 3,
                    fontWeight: "540",
                    py: 1.5,
                    px: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}>
                New Expense
            </Button>            
            {/* new expense form dialog*/}
            <Dialog open={openAddExpense} onClose={handleCloseAddExpense}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent>
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
                            type="text"
                            //select
                            fullWidth
                            variant="outlined"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="date"
                            label="Date"
                            type="date"
                            //fullWidth
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
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default HomePage;

