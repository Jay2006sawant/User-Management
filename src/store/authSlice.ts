import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockLogin } from '../services/mockApi';

interface UserProfile {
  name: string;
  email: string;
  user_id: string;
  tenant_id: string;
  organization_id: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const AUTH_STORAGE_KEY = 'um_auth';

function saveAuthToStorage(auth: { token: string | null; user: UserProfile | null }) {
  if (auth.token && auth.user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function loadAuthFromStorage(): AuthState {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return initialState;
  try {
    const parsed = JSON.parse(raw);
    return {
      ...initialState,
      token: parsed.token,
      user: parsed.user,
    };
  } catch {
    return initialState;
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await mockLogin(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      saveAuthToStorage({ token: null, user: null });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        saveAuthToStorage({ token: action.payload.token, user: action.payload.user });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 