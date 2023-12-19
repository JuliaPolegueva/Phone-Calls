import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICalls } from '../../types/call.types';

// type TDatesPages = {
//   dates: {
//     startDate: number;
//     endDate: number;
//   };
//   pageNumber: number;
// };

export const fetchCalls = createAsyncThunk<ICalls, undefined>('calls/fetchCalls', async (_, thunkApi) => {
  //const start = getDateForFetch(data.dates.startDate);
  //const end = getDateForFetch(data.dates.endDate);
  //const offset = data.pageNumber * 50;

  try {
    const response = await fetch(`https://api.skilla.ru/mango/getList`, {
      method: 'POST',
      headers: { Authorization: 'Bearer testtoken' },
      redirect: 'follow',
    });

    const result = response.json();
    console.log(result);
    return result;
  } catch (error) {
    return thunkApi.rejectWithValue('Что-то пошло не так..');
  }
});

export interface ICallsInitialState {
  calls: ICalls;
  loading: boolean;
  error: string | null;
  pageNumber: number;
}

const initialState: ICallsInitialState = {
  calls: {
    total_rows: '',
    results: [],
  },
  loading: false,
  error: null,
  pageNumber: 0,
};

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCalls.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.loading = false;

        if (state.pageNumber > 0) {
          state.calls.results = [...state.calls.results, ...action.payload.results];
        } else {
          state.calls = action.payload;
        }
        state.pageNumber++;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export default callsSlice.reducer;
