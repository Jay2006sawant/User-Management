import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockGetLegalEntities, mockAddLegalEntity, mockEditLegalEntity, mockDeleteLegalEntity } from '../services/mockApi';
import type { LegalEntity } from '../services/mockApi';

interface LegalEntityState {
  legalEntities: LegalEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: LegalEntityState = {
  legalEntities: [],
  loading: false,
  error: null,
};

export const fetchLegalEntities = createAsyncThunk('legalEntities/fetchLegalEntities', async (_, { rejectWithValue }) => {
  try {
    return await mockGetLegalEntities();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const addLegalEntity = createAsyncThunk(
  'legalEntities/addLegalEntity',
  async (data: Omit<LegalEntity, 'id'>, { rejectWithValue }) => {
    try {
      return await mockAddLegalEntity(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editLegalEntity = createAsyncThunk(
  'legalEntities/editLegalEntity',
  async (
    { id, data }: { id: string; data: Partial<Omit<LegalEntity, 'id'>> },
    { rejectWithValue }
  ) => {
    try {
      return await mockEditLegalEntity(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteLegalEntity = createAsyncThunk(
  'legalEntities/deleteLegalEntity',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockDeleteLegalEntity(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const legalEntitySlice = createSlice({
  name: 'legalEntities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegalEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegalEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities = action.payload;
      })
      .addCase(fetchLegalEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities.push(action.payload);
      })
      .addCase(addLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.legalEntities.findIndex((le) => le.id === action.payload.id);
        if (idx !== -1) {
          state.legalEntities[idx] = action.payload;
        }
      })
      .addCase(editLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities = state.legalEntities.filter((le) => le.id !== action.payload.id);
      })
      .addCase(deleteLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default legalEntitySlice.reducer; 