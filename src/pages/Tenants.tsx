import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchTenants, deleteTenant, editTenant } from '../store/tenantSlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddTenantDialog from '../components/molecules/AddTenantDialog';

const Tenants: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tenants, loading, error } = useSelector((state: RootState) => state.tenants);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTenant(id));
  };

  const handleEdit = (tenant: typeof tenants[0]) => {
    setEditId(tenant.id);
    setEditName(tenant.name);
  };

  const handleEditSave = () => {
    if (editId) {
      dispatch(editTenant({ id: editId, data: { name: editName } }));
      setEditId(null);
    }
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phone.toLowerCase().includes(search.toLowerCase()) ||
      tenant.website.toLowerCase().includes(search.toLowerCase()) ||
      tenant.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Tenants</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Tenant
        </Button>
      </Box>
      <Box mb={2}>
        <input
          type="text"
          placeholder="Search by name, email, phone, website, or industry..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, width: 350, borderRadius: 4, border: '1px solid #ccc' }}
        />
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTenants.map((tenant) => (
            <tr key={tenant.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.website}</td>
              <td>{tenant.industry}</td>
              <td>{tenant.employee_count}</td>
              <td>
                <Button size="small" onClick={() => handleEdit(tenant)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(tenant.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple Edit Dialog */}
      {editId && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} bgcolor="#fafafa">
          <Typography variant="h6">Edit Tenant Name</Typography>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={handleEditSave} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" size="small" onClick={() => setEditId(null)}>Cancel</Button>
        </Box>
      )}
      <AddTenantDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Tenants; 