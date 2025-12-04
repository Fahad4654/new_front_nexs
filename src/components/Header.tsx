import React from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        px: { xs: 1, sm: 2 },
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: 'hsl(0 0% 100%)',
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.25rem' },
        }}
      >
        Neighbor Nexus
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            color: 'hsl(0 0% 100%)',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            textAlign: 'right',
          }}
        >
          {user.email && (
            <>
              <Typography variant="body2">Welcome</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {user.email}
              </Typography>
            </>
          )}
        </Box>

        <IconButton
          onClick={handleMenuOpen}
          sx={{ color: 'hsl(0 0% 100%)' }}
        >
          <Avatar sx={{ bgcolor: 'hsl(211 51% 65%)', width: 32, height: 32 }}>
            {user.email ? user.email[0].toUpperCase() : 'U'}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;