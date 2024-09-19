import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    CssBaseline,
    useTheme,
    useMediaQuery,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; 

const drawerWidth = 240;

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);
   

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* AppBar - Top Navbar */}
            <AppBar position="fixed" elevation={0} color="secondary" sx={{ py: 1, borderBottom: '2px solid #f4f6f7', zIndex: theme.zIndex.drawer + 3 }}>
                <Toolbar>
                    {/* Hamburger Menu Icon */}
                    
                    <Typography variant="h3" sx={{
                        flexGrow: 1,
                        fontFamily: 'Dancing Script',
                        fontWeight: "400",
                    }}>
                    Cashly
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                isMobile={isMobile}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
