import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tenantReducer from './tenantSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 