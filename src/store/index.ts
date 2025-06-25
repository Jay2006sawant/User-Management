import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tenantReducer from './tenantSlice';
import userReducer from './userSlice';
import roleReducer from './roleSlice';
import privilegeReducer from './privilegeSlice';
import legalEntityReducer from './legalEntitySlice';
import { loadAuthFromStorage } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantReducer,
    users: userReducer,
    roles: roleReducer,
    privileges: privilegeReducer,
    legalEntities: legalEntityReducer,
  },
  preloadedState: {
    auth: loadAuthFromStorage(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 