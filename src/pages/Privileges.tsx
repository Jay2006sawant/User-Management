import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchPrivileges, deletePrivilege, editPrivilege } from '../store/privilegeSlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddPrivilegeDialog from '../components/molecules/AddPrivilegeDialog';

const Privileges: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { privileges, loading, error } = useSelector((state: RootState) => state.privileges);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPrivileges());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deletePrivilege(id));
  };

  const handleEdit = (priv: typeof privileges[0]) => {
    setEditId(priv.id);
    setEditName(priv.name);
  };

  const handleEditSave = () => {
    if (editId) {
      dispatch(editPrivilege({ id: editId, data: { name: editName } }));
      setEditId(null);
    }
  };

  const filteredPrivileges = privileges.filter(
    (priv) =>
      priv.name.toLowerCase().includes(search.toLowerCase()) ||
      priv.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box style={{ padding: 32 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Privileges</Typography>
        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>
          Add Privilege
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
          {filteredPrivileges.map((priv) => (
            <tr key={priv.id}>
              <td>{priv.id}</td>
              <td>{priv.name}</td>
              <td>{priv.description}</td>
              <td>
                <Button size="small" onClick={() => handleEdit(priv)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(priv.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple Edit Dialog */}
      {editId && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} bgcolor="#fafafa">
          <Typography variant="h6">Edit Privilege Name</Typography>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={handleEditSave} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" size="small" onClick={() => setEditId(null)}>Cancel</Button>
        </Box>
      )}
      <AddPrivilegeDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  );
};

export default Privileges; 