import { configureStore } from '@reduxjs/toolkit';

import fetchCalls from './calls/calls.actions';
import { callsAPI } from './api/calls.api';

export const store = configureStore({
  reducer: {
    calls: fetchCalls,
    [callsAPI.reducerPath]: callsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(callsAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
