import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTenant } from '../../store/tenantSlice';
import { AppDispatch } from '../../store';

interface AddTenantDialogProps {
  open: boolean;
  onClose: () => void;
}

interface TenantFormInputs {
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  logo_url: string;
  industry: string;
  annual_revenue: string;
  employee_count: number;
}

const AddTenantDialog: React.FC<AddTenantDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<TenantFormInputs>();

  const onSubmit = (data: TenantFormInputs) => {
    dispatch(addTenant(data));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Tenant</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" fullWidth {...register('name', { required: true })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" fullWidth {...register('email', { required: true })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" fullWidth {...register('phone')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Website" fullWidth {...register('website')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Industry" fullWidth {...register('industry')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Annual Revenue" fullWidth {...register('annual_revenue')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Employee Count" type="number" fullWidth {...register('employee_count')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Logo URL" fullWidth {...register('logo_url')} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" fullWidth multiline rows={2} {...register('description')} />
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

export default AddTenantDialog; 