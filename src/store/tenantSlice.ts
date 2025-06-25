import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockGetTenants, mockAddTenant, mockEditTenant, mockDeleteTenant } from '../services/mockApi';
import type { Tenant } from '../services/mockApi';

interface TenantState {
  tenants: Tenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantState = {
  tenants: [],
  loading: false,
  error: null,
};

export const fetchTenants = createAsyncThunk('tenants/fetchTenants', async (_, { rejectWithValue }) => {
  try {
    return await mockGetTenants();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const addTenant = createAsyncThunk(
  'tenants/addTenant',
  async (data: Omit<Tenant, 'id' | 'created_at' | 'updated_at' | 'active'>, { rejectWithValue }) => {
    try {
      return await mockAddTenant(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const editTenant = createAsyncThunk(
  'tenants/editTenant',
  async (
    { id, data }: { id: string; data: Partial<Omit<Tenant, 'id' | 'created_at' | 'updated_at'>> },
    { rejectWithValue }
  ) => {
    try {
      return await mockEditTenant(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTenant = createAsyncThunk(
  'tenants/deleteTenant',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockDeleteTenant(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants.push(action.payload);
      })
      .addCase(addTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTenant.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.tenants.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.tenants[idx] = action.payload;
        }
      })
      .addCase(editTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = state.tenants.filter((t) => t.id !== action.payload.id);
      })
      .addCase(deleteTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tenantSlice.reducer; 