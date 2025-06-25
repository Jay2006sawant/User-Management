import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchRoles, deleteRole, editRole } from '../store/roleSlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddRoleDialog from '../components/molecules/AddRoleDialog';

const Roles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, loading, error } = useSelector((state: RootState) => state.roles);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteRole(id));
  };

  const handleEdit = (role: typeof roles[0]) => {
    setEditId(role.id);
    setEditName(role.name);
  };

  const handleEditSave = () => {
    if (editId) {
      dispatch(editRole({ id: editId, data: { name: editName } }));
      setEditId(null);
    }
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box style={{ padding: 32 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Roles</Typography>
        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>
          Add Role
        </Button>
      </Box>
      <Box mb={2}>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, width: 300, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <table className="entity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>
                <Button size="small" onClick={() => handleEdit(role)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(role.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple Edit Dialog */}
      {editId && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} bgcolor="#fafafa">
          <Typography variant="h6">Edit Role Name</Typography>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={handleEditSave} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" size="small" onClick={() => setEditId(null)}>Cancel</Button>
        </Box>
      )}
      <AddRoleDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  );
};

export default Roles; 