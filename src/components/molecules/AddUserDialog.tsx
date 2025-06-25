import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/userSlice';
import type { AppDispatch } from '../../store';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

interface UserFormInputs {
  name: string;
  email: string;
  role: string;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<UserFormInputs>();

  const onSubmit = (data: UserFormInputs) => {
    dispatch(addUser(data));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Name" fullWidth {...register('name', { required: true })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" fullWidth {...register('email', { required: true })} />
            </Grid>
            <Grid size={12}>
              <TextField label="Role" fullWidth {...register('role', { required: true })} />
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

export default AddUserDialog; 