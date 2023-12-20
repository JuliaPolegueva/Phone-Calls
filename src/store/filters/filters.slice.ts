import { createSlice } from '@reduxjs/toolkit';

export interface IFiltersInitialState {
  filterType: {
    name: string;
    activeFilter: string;
  };
  offsetNum: number;
}

const initialState: IFiltersInitialState = {
  filterType: {
    name: 'Все типы',
    activeFilter: 'Все типы',
  },
  offsetNum: 0,
};

export const filterCallsSlice = createSlice({
  name: 'calls-filters',
  initialState,
  reducers: {
    setActiveFilters: (state, action) => {
      state.filterType.activeFilter = action.payload;
    },

    resetFilters: state => {
      state.filterType.activeFilter = state.filterType.name;
      state.filterType.activeFilter = state.filterType.name;
    },
  },
});

export const { setActiveFilters, resetFilters } = filterCallsSlice.actions;
export default filterCallsSlice.reducer;
