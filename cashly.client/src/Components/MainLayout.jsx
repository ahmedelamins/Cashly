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
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "./Sidebar"; 

const drawerWidth = 240;

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);
   // const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //const handleMenuOpen = (e) => {
    //    setAnchorEl(e.currentTarget);
    //};

    //const handleMenuClose = () => {
    //    setAnchorEl(null);
    //};

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* AppBar - Top Navbar */}
            <AppBar position="fixed" color="secondary" sx={{ py: 1, borderBottom: '2px solid #f4f6f7', zIndex: theme.zIndex.drawer + 1 }}>
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
                    {/* User Profile Menu */}
                    {/*<Tooltip title="Account settings">*/}
                    {/*    <IconButton*/}
                    {/*        color="inherit"*/}
                    {/*        edge="end"*/}
                    {/*        onClick={handleMenuOpen}*/}
                    {/*        sx={{ ml: 2 }}*/}
                    {/*    >*/}
                    {/*        <Avatar>*/}
                    {/*            <AccountCircleIcon />*/}
                    {/*        </Avatar>*/}
                    {/*    </IconButton>*/}
                    {/*</Tooltip>*/}
                    {/*<Menu*/}
                    {/*    anchorEl={anchorEl}*/}
                    {/*    open={Boolean(anchorEl)}*/}
                    {/*    onClose={handleMenuClose}*/}
                    {/*>*/}
                    {/*    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>*/}
                    {/*    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>*/}
                    {/*</Menu>*/}
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
