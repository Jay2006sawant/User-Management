import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchUsers, deleteUser, editUser } from '../store/userSlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddUserDialog from '../components/molecules/AddUserDialog';

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user: typeof users[0]) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  const handleEditSave = () => {
    if (editId) {
      dispatch(editUser({ id: editId, data: { name: editName } }));
      setEditId(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box style={{ padding: 32 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>
          Add User
        </Button>
      </Box>
      <Box mb={2}>
        <input
          type="text"
          placeholder="Search by name, email, or role..."
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
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button size="small" onClick={() => handleEdit(user)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple Edit Dialog */}
      {editId && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} bgcolor="#fafafa">
          <Typography variant="h6">Edit User Name</Typography>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={handleEditSave} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" size="small" onClick={() => setEditId(null)}>Cancel</Button>
        </Box>
      )}
      <AddUserDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  );
};

export default Users; 