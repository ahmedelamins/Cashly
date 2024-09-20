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
import { toast } from "react-toastify";


const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

    const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
        handleClose();
  };

    const handleLogout = (e) => {
        localStorage.clear();

        navigate('/');

        toast.info("See You Later.");
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
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
                  sx={{
                      mx: 2,
                      mt: "4rem",
                      p: "12px",
                      fontWeight: 550,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                          transform: 'scale(1.1)',
                      },
                  }}
             >
          New Expense
        </Button>

        <Button
          variant="contained"
                  color="error"
                  onClick={handleLogout}
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
      {/* Dialog for New Transaction */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Transaction</DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", mt: 2 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
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
              variant="outlined"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="category"
              label="Category"
              select
              fullWidth
              variant="outlined"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
