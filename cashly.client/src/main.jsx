import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import HomePage from './Pages/HomePage';
import ReportsPage from './Pages/ReportsPage';
import SettingsPage from './Pages/SettingsPage';
import ErrorPage from './Pages/ErrorPage';
import MainLayout from './Components/MainLayout';
import ProtectedRoute from './Components/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                element:
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>

            },
            {
                path: "reports",
                element: <ProtectedRoute>
                    <ReportsPage />
                </ProtectedRoute>
            },
            {
                path: "settings",
                element:
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
            },
        ],
    },
]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <ToastContainer position="top-left" autoClose="1400" hideProgressBar="true" />
        </ThemeProvider>
    </StrictMode> 
)
