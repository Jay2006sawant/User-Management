import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTenants } from '../store/tenantSlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddTenantDialog from '../components/molecules/AddTenantDialog';

const Tenants: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tenants, loading, error } = useSelector((state: RootState) => state.tenants);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Tenants</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Tenant
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Industry</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.website}</td>
              <td>{tenant.industry}</td>
              <td>{tenant.employee_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTenantDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Tenants; 