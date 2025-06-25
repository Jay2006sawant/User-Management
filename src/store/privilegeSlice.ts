import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockGetPrivileges, mockAddPrivilege, mockEditPrivilege, mockDeletePrivilege } from '../services/mockApi';
import type { Privilege } from '../services/mockApi';

interface PrivilegeState {
  privileges: Privilege[];
  loading: boolean;
  error: string | null;
}

const initialState: PrivilegeState = {
  privileges: [],
  loading: false,
  error: null,
};

export const fetchPrivileges = createAsyncThunk('privileges/fetchPrivileges', async (_, { rejectWithValue }) => {
  try {
    return await mockGetPrivileges();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const addPrivilege = createAsyncThunk(
  'privileges/addPrivilege',
  async (data: Omit<Privilege, 'id'>, { rejectWithValue }) => {
    try {
      return await mockAddPrivilege(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editPrivilege = createAsyncThunk(
  'privileges/editPrivilege',
  async (
    { id, data }: { id: string; data: Partial<Omit<Privilege, 'id'>> },
    { rejectWithValue }
  ) => {
    try {
      return await mockEditPrivilege(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deletePrivilege = createAsyncThunk(
  'privileges/deletePrivilege',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockDeletePrivilege(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const privilegeSlice = createSlice({
  name: 'privileges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivileges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivileges.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges = action.payload;
      })
      .addCase(fetchPrivileges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrivilege.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges.push(action.payload);
      })
      .addCase(addPrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editPrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPrivilege.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.privileges.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.privileges[idx] = action.payload;
        }
      })
      .addCase(editPrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrivilege.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges = state.privileges.filter((p) => p.id !== action.payload.id);
      })
      .addCase(deletePrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default privilegeSlice.reducer; 