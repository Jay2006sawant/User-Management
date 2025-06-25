import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addRole } from '../../store/roleSlice';
import type { AppDispatch } from '../../store';

interface AddRoleDialogProps {
  open: boolean;
  onClose: () => void;
}

interface RoleFormInputs {
  name: string;
  description: string;
}

const AddRoleDialog: React.FC<AddRoleDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<RoleFormInputs>();

  const onSubmit = (data: RoleFormInputs) => {
    dispatch(addRole(data));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Role</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField label="Name" fullWidth {...register('name', { required: true })} />
            </Grid>
            <Grid size={12}>
              <TextField label="Description" fullWidth {...register('description', { required: true })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddRoleDialog; 