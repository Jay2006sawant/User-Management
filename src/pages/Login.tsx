import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { login } from '../store/authSlice';
import type { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Sign In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: true })}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </form>
    </Box>
  );
};

export default Login; 