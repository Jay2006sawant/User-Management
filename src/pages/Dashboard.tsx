import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h5">123</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Tenants</Typography>
            <Typography variant="h5">5</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Organizations</Typography>
            <Typography variant="h5">8</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Roles</Typography>
            <Typography variant="h5">4</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);

export default Dashboard; 