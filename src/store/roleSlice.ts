import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockGetRoles, mockAddRole, mockEditRole, mockDeleteRole } from '../services/mockApi';
import type { Role } from '../services/mockApi';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    return await mockGetRoles();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const addRole = createAsyncThunk(
  'roles/addRole',
  async (data: Omit<Role, 'id'>, { rejectWithValue }) => {
    try {
      return await mockAddRole(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editRole = createAsyncThunk(
  'roles/editRole',
  async (
    { id, data }: { id: string; data: Partial<Omit<Role, 'id'>> },
    { rejectWithValue }
  ) => {
    try {
      return await mockEditRole(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockDeleteRole(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.roles.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) {
          state.roles[idx] = action.payload;
        }
      })
      .addCase(editRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((r) => r.id !== action.payload.id);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer; 