import React from 'react';
import { Box, Typography, useMediaQuery, useTheme, Card, CardContent, Stack, Chip, Avatar } from '@mui/material';
import DataTable, { Column } from '../components/DataTable';

const Users: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const users = [
        { username: 'johndoe', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '555-0101', isAdmin: false, isVerified: true, rating_avg: 4.5, geo_location: 'New York, NY', createdAt: '2024-01-15', image: 'https://i.pravatar.cc/150?img=1' },
        { username: 'janesmith', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '555-0102', isAdmin: true, isVerified: true, rating_avg: 4.8, geo_location: 'Los Angeles, CA', createdAt: '2024-02-20', image: 'https://i.pravatar.cc/150?img=2' },
        { username: 'bobjohnson', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phoneNumber: '555-0103', isAdmin: false, isVerified: false, rating_avg: 3.9, geo_location: 'Chicago, IL', createdAt: '2024-03-10', image: 'https://i.pravatar.cc/150?img=3' },
        { username: 'alicebrown', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', phoneNumber: '555-0104', isAdmin: false, isVerified: true, rating_avg: 4.7, geo_location: 'Houston, TX', createdAt: '2024-04-05', image: 'https://i.pravatar.cc/150?img=4' },
        { username: 'charliew', firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com', phoneNumber: '555-0105', isAdmin: false, isVerified: true, rating_avg: 4.3, geo_location: 'Phoenix, AZ', createdAt: '2024-05-12', image: 'https://i.pravatar.cc/150?img=5' },
        { username: 'davidmiller', firstName: 'David', lastName: 'Miller', email: 'david@example.com', phoneNumber: '555-0106', isAdmin: false, isVerified: true, rating_avg: 4.6, geo_location: 'Philadelphia, PA', createdAt: '2024-06-08', image: 'https://i.pravatar.cc/150?img=6' },
        { username: 'emilyjones', firstName: 'Emily', lastName: 'Jones', email: 'emily@example.com', phoneNumber: '555-0107', isAdmin: false, isVerified: true, rating_avg: 4.4, geo_location: 'San Antonio, TX', createdAt: '2024-07-14', image: 'https://i.pravatar.cc/150?img=7' },
        { username: 'frankgarcia', firstName: 'Frank', lastName: 'Garcia', email: 'frank@example.com', phoneNumber: '555-0108', isAdmin: false, isVerified: false, rating_avg: 3.8, geo_location: 'San Diego, CA', createdAt: '2024-08-21', image: 'https://i.pravatar.cc/150?img=8' },
        { username: 'gracetaylor', firstName: 'Grace', lastName: 'Taylor', email: 'grace@example.com', phoneNumber: '555-0109', isAdmin: false, isVerified: true, rating_avg: 4.9, geo_location: 'Dallas, TX', createdAt: '2024-09-03', image: 'https://i.pravatar.cc/150?img=9' },
        { username: 'henrylee', firstName: 'Henry', lastName: 'Lee', email: 'henry@example.com', phoneNumber: '555-0110', isAdmin: false, isVerified: true, rating_avg: 4.2, geo_location: 'Austin, TX', createdAt: '2024-10-11', image: 'https://i.pravatar.cc/150?img=10' },
    ];

    const columns: Column[] = [
        { id: 'sl', label: 'S.L', sortable: false, render: (value, row, index = 0) => index + 1 },
        { id: 'image', label: 'Image', sortable: false, render: (value) => <Avatar src={value} alt="User" sx={{ width: 40, height: 40 }} /> },
        { id: 'username', label: 'Username', sortable: true },
        { id: 'firstName', label: 'First Name', sortable: true },
        { id: 'lastName', label: 'Last Name', sortable: true },
        { id: 'email', label: 'Email', sortable: true },
        { id: 'phoneNumber', label: 'Phone', sortable: false },
        { id: 'geo_location', label: 'Location', sortable: false, responsive: 'desktop' },
        { id: 'rating_avg', label: 'Rating', sortable: true, responsive: 'desktop', render: (value) => `${value}/5` },
        { id: 'isAdmin', label: 'Admin', render: (value) => <Chip label={value ? 'Yes' : 'No'} size="small" color={value ? 'primary' : 'default'} /> },
        { id: 'isVerified', label: 'Verified', render: (value) => <Chip label={value ? 'Yes' : 'No'} size="small" color={value ? 'success' : 'error'} /> },
        { id: 'createdAt', label: 'Created', sortable: true },
    ];

    const mobileCardRender = (user: typeof users[0], index: number = 0) => (
        <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                    <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} sx={{ width: 60, height: 60 }} />
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                            #{index + 1} - {user.firstName} {user.lastName}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: 'text.secondary' }}>
                            @{user.username}
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={{ xs: 0.25, sm: 0.5 }} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    <Typography><strong>Email:</strong> {user.email}</Typography>
                    <Typography><strong>Phone:</strong> {user.phoneNumber}</Typography>
                    <Typography><strong>Location:</strong> {user.geo_location}</Typography>
                    <Typography><strong>Rating:</strong> {user.rating_avg}/5</Typography>
                    <Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
                        {user.isAdmin && <Chip label="Admin" size="small" color="primary" sx={{ mr: 1, fontSize: { xs: '0.65rem', sm: '0.75rem' } }} />}
                        {user.isVerified && <Chip label="Verified" size="small" color="success" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }} />}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ 
            pt: { xs: 1, sm: 2, md: 3, lg: 4 },
            px: { xs: 1, sm: 1.5, md: 2, lg: 3 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom sx={{ mb: { xs: 1.5, sm: 2, md: 3, lg: 4 } }}>
                Users
            </Typography>
            <DataTable
                columns={columns}
                data={users}
                isMobile={isMobile}
                mobileCardRender={mobileCardRender}
            />
        </Box>
    );
};

export default Users;