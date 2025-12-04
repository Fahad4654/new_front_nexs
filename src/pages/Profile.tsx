import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Typography>
        Your profile information goes here.
      </Typography>
    </Box>
  );
};

export default Profile;