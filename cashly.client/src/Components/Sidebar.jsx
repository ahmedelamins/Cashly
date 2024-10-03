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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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
        }, 500);

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
            <HomeOutlinedIcon fontSize="large" />
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
            <SignalCellularAltRoundedIcon fontSize="large" />
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
            <SettingsOutlinedIcon fontSize="large" />
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
              <DialogTitle sx={{ textAlign: 'center' }}>
                  {loading ? "Logging out.." : "Logout"}
              </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               {loading ? <CircularProgress /> : (
                    <Box>
                        <DialogActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Button variant="contained" onClick={() => setLogoutOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleLogout}>
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
