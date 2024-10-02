import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000', // Black for primary
        },
        secondary: {
            main: '#f7fcfc' // off-White for secondary
        },
        error: {
            main: "#d32f2f"
        },
        idk: {
            main: '#28698a'
        },
        background: {
            default: '#fff', // White background
        },
        text: {
            primary: '#000', // Black text
            secondary: '#4a7766', // Greyish secondary text
        },
    },

    typography: {
        fontFamily: 'Roboto, Arial, sans-serif, Grey Qo',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '0.1rem',
            color: '#000',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '0.05rem',
            color: '#000',
        },
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;