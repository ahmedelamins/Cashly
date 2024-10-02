import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    Paper,
    Grid,
} from '@mui/material';

const ReportsPage = () => {

    return (
        <Box sx={{ mt: 1, mb: 2, p: 1 }}>
            <Typography variant="h4" sx={{ textAlign: 'left' }}>
                Understand your expenses
            </Typography>

            {/* report container*/}
            <Grid item xs={1} md={6} sx={{ mt: 2 }}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Expenditure by category
                    </Typography>
                    
                </Paper>
            </Grid>
        </Box>
    );
}

export default ReportsPage