import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Typography>
        Welcome to the dashboard!
      </Typography>
    </Box>
  );
};

export default Dashboard;