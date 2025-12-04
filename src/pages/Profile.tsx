import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Profile: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Typography variant="body1" gutterBottom>
                Here you can view and edit your profile information.
            </Typography>
            <Button variant="contained" color="primary">
                Edit Profile
            </Button>
        </Container>
    );
};

export default Profile;