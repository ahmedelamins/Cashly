import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import HomePage from './Pages/HomePage';
import ReportsPage from './Pages/ReportsPage';
import SettingsPage from './Pages/SettingsPage';
import ErrorPage from './Pages/ErrorPage';
import MainLayout from './Components/MainLayout';


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "reports",
                element: <ReportsPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
        ],
    },
]);

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;