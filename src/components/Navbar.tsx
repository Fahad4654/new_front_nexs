import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const drawerWidth = 240;

  const menuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Users', path: '/users', icon: <PeopleIcon /> },
    // { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '64px',
          backgroundColor: 'hsl(212 55% 25%)',
          color: 'hsl(210 40% 98%)',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'hsl(210 40% 98%)' }}>
          Navigation
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'hsl(212 55% 35%)' }} />
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                color: 'hsl(210 40% 98%)',
                '&:hover': {
                  backgroundColor: 'hsl(212 55% 35%)',
                },
                '&.active': {
                  backgroundColor: 'hsl(211 51% 55%)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: 'hsl(212 55% 35%)' }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: 'hsl(0 84% 60%)',
              '&:hover': {
                backgroundColor: 'hsl(0 84% 70%)',
                color: 'hsl(0 0% 100%)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;