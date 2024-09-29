import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";


const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  
    const navigate = useNavigate();

    const [logoutOpen, setLogoutOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);

        setTimeout(() => {

            localStorage.clear();
            setLoading(false);

            navigate('/');
            toast.info("See You Later.");
        }, 900);

    }

  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ mt: 7 }}>
        <ListItem
          button="true"
          component={Link}
          to="/home"
          onClick={isMobile ? handleDrawerToggle : null}
          sx={{
            my: 3, height: "60px"
          }}>
        
          <ListItemIcon sx={{ minWidth: "40px", color: "black" }}>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ fontSize: "1.2rem" }}
          />
        </ListItem>

        <ListItem
          button="true"
          component={Link}
          to="/reports"
          onClick={isMobile ? handleDrawerToggle : null}
          sx={{
            my: 3, height: "60px"
          }}>
            
          <ListItemIcon sx={{ minWidth: "40px", color: "black" }}>
            <ReportIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            primaryTypographyProps={{ fontSize: "1.2rem" }}
          />
        </ListItem>

        <ListItem
          button="true" 
          component={Link}
          to="/settings"
          onClick={isMobile ? handleDrawerToggle : null}
          sx={{
            my: 3, height: "60px"
          }}>
          <ListItemIcon sx={{ minWidth: "40px", color: "black" }}>
            <SettingsIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontSize: "1.2rem" }}
          />
        </ListItem>        
        <Button
          variant="outlined"
          color="error"
          onClick={() => setLogoutOpen(true)}
          sx={{
             mx: 2,
             mt: "5rem",
             p: "13px",
             fontWeight: 550,
             transition: 'transform 0.3s ease',
             '&:hover': {
                  transform: 'scale(1.1)',
             },
          }}>
             <span style={{ marginRight: '8px' }}>Logout</span>
             <LogoutIcon />
        </Button>
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>

          {/* Logout dialog*/}
      <Dialog maxWidth="xs" fullWidth open={logoutOpen} onClose={() => setLogoutOpen(false)}>
         <DialogTitle>Logout?</DialogTitle>
            <DialogContent>
               {loading ? <CircularProgress /> : (
                    <Box>
                        <DialogActions>
                            <Button varaint="contained" onClick={() => setLogoutOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleLogout}>
                               Yes
                              </Button>
                        </DialogActions>
                    </Box>
               )}
          </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
