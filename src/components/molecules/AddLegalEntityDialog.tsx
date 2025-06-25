import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addLegalEntity } from '../../store/legalEntitySlice';
import type { AppDispatch } from '../../store';

interface AddLegalEntityDialogProps {
  open: boolean;
  onClose: () => void;
}

interface LegalEntityFormInputs {
  name: string;
  type: string;
  country: string;
}

const AddLegalEntityDialog: React.FC<AddLegalEntityDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<LegalEntityFormInputs>();

  const onSubmit = (data: LegalEntityFormInputs) => {
    dispatch(addLegalEntity(data));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Legal Entity</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField label="Name" fullWidth {...register('name', { required: true })} />
            </Grid>
            <Grid size={12}>
              <TextField label="Type" fullWidth {...register('type', { required: true })} />
            </Grid>
            <Grid size={12}>
              <TextField label="Country" fullWidth {...register('country', { required: true })} />
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

export default AddLegalEntityDialog; 