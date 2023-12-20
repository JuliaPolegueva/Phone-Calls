import { createSlice } from '@reduxjs/toolkit';

import {
  getDayDate,
  getFirstDayMonth,
  getFormatDate,
  getFormatUserDate,
  getLastDayMonth,
  getMonthDate,
  getWeekDate,
  getYearDate,
} from '../../utils/getDateFilter';

export interface IDateInitialState {
  filters: string[];
  activeFilter: string;
  dates: {
    startDate: string;
    endDate: string;
  };
}

const initialState: IDateInitialState = {
  filters: ['3 дня', 'Неделя', 'Месяц', 'Год'],
  activeFilter: '3 дня',
  dates: {
    startDate: getDayDate(Date.now()).start,
    endDate: getDayDate(Date.now()).end,
  },
};

export const filterDateSlice = createSlice({
  name: 'date-filter',
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    setDefaultDates: (state, action) => {
      switch (action.payload) {
        case '3 дня':
          {
            const { start, end } = getDayDate(Date.now());
            state.dates.startDate = start;
            state.dates.endDate = end;
          }
          break;
        case 'Неделя':
          {
            const { start, end } = getWeekDate(Date.now());
            state.dates.startDate = start;
            state.dates.endDate = end;
          }
          break;
        case 'Месяц':
          {
            const { start, end } = getMonthDate(Date.now());
            state.dates.startDate = start;
            state.dates.endDate = end;
          }
          break;
        case 'Год': {
          const { start, end } = getYearDate(Date.now());
          state.dates.startDate = start;
          state.dates.endDate = end;
        }
      }
    },

    setUserDates: (state, action) => {
      state.dates.startDate = getFormatUserDate(action.payload.startDate);
      state.dates.endDate = getFormatUserDate(action.payload.endDate);
    },

    setBackDates: state => {
      const dayMs = 24 * 60 * 60 * 1000;

      switch (state.activeFilter) {
        case '3 дня':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() - dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() - 3 * dayMs);
          }
          break;
        case 'Неделя':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() - dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() - 7 * dayMs);
          }
          break;
        case 'Месяц':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() - dayMs);
            state.dates.startDate = getFirstDayMonth(new Date(state.dates.startDate).getTime() - dayMs);
          }
          break;
        case 'Год':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() - 365 * dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() - 365 * dayMs);
          }
          break;
      }
    },

    setForwardDates: state => {
      const dayMs = 24 * 60 * 60 * 1000;

      switch (state.activeFilter) {
        case '3 дня':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() + dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() + 3 * dayMs);
          }
          break;
        case 'Неделя':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() + dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() + 7 * dayMs);
          }
          break;
        case 'Месяц':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() + dayMs);
            state.dates.startDate = getLastDayMonth(new Date(state.dates.startDate).getTime() + dayMs);
          }
          break;
        case 'Год':
          {
            state.dates.endDate = getFormatDate(new Date(state.dates.endDate).getTime() + 365 * dayMs);
            state.dates.startDate = getFormatDate(new Date(state.dates.startDate).getTime() + 365 * dayMs);
          }
          break;
      }
    },
  },
});

export const { setActiveFilter, setDefaultDates, setBackDates, setForwardDates, setUserDates } =
  filterDateSlice.actions;
export default filterDateSlice.reducer;
