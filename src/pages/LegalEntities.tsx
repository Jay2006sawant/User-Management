import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchLegalEntities, deleteLegalEntity, editLegalEntity } from '../store/legalEntitySlice';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

const LegalEntities: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { legalEntities, loading, error } = useSelector((state: RootState) => state.legalEntities);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    dispatch(fetchLegalEntities());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteLegalEntity(id));
  };

  const handleEdit = (le: typeof legalEntities[0]) => {
    setEditId(le.id);
    setEditName(le.name);
  };

  const handleEditSave = () => {
    if (editId) {
      dispatch(editLegalEntity({ id: editId, data: { name: editName } }));
      setEditId(null);
    }
  };

  return (
    <Box style={{ padding: 32 }}>
      <Typography variant="h4" mb={2}>Legal Entities</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <table className="entity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {legalEntities.map((le) => (
            <tr key={le.id}>
              <td>{le.id}</td>
              <td>{le.name}</td>
              <td>{le.type}</td>
              <td>{le.country}</td>
              <td>
                <Button size="small" onClick={() => handleEdit(le)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(le.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple Edit Dialog */}
      {editId && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} bgcolor="#fafafa">
          <Typography variant="h6">Edit Legal Entity Name</Typography>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" size="small" onClick={handleEditSave} sx={{ mr: 1 }}>Save</Button>
          <Button variant="outlined" size="small" onClick={() => setEditId(null)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default LegalEntities; 