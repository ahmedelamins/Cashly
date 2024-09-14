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


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
  </StrictMode>,
)
