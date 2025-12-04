import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Neighbor Nexus!
            </Typography>
            <Typography variant="body1" paragraph>
                Neighbor Nexus is your go-to platform for connecting with your community, sharing resources, and staying informed about local events.
            </Typography>
            <Button variant="contained" color="primary">
                Get Started
            </Button>
        </Container>
    );
};

export default Home;