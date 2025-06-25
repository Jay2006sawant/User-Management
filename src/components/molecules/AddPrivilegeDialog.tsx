import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPrivilege } from '../../store/privilegeSlice';
import type { AppDispatch } from '../../store';

interface AddPrivilegeDialogProps {
  open: boolean;
  onClose: () => void;
}

interface PrivilegeFormInputs {
  name: string;
  description: string;
}

const AddPrivilegeDialog: React.FC<AddPrivilegeDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<PrivilegeFormInputs>();

  const onSubmit = (data: PrivilegeFormInputs) => {
    dispatch(addPrivilege(data));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Privilege</DialogTitle>
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

export default AddPrivilegeDialog; 