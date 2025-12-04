import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">User Activities</Typography>
                    {/* Add user activities overview here */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Statistics</Typography>
                    {/* Add statistics overview here */}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;