import { configureStore } from '@reduxjs/toolkit';

import filterDateSlice from './date/date.slice';
import { callsAPI } from './api/calls.api';
import filterCallsSlice from './filters/filters.slice';

export const store = configureStore({
  reducer: {
    filterDate: filterDateSlice,
    filterCalls: filterCallsSlice,
    [callsAPI.reducerPath]: callsAPI.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(callsAPI.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
