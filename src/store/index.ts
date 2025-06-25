import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tenantReducer from './tenantSlice';
import userReducer from './userSlice';
import roleReducer from './roleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantReducer,
    users: userReducer,
    roles: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 