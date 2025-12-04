import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Home
      </Typography>
      <Typography>
        Welcome to Neighbor Nexus!
      </Typography>
    </Box>
  );
};

export default Home;