import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAudioProps, ICalls, ICallsProps, IFilterProps } from '../../types/call.types';

export const callsAPI = createApi({
  reducerPath: 'callsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru/mango/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', `Bearer testtoken`);
      return headers;
    },
  }),
  tagTypes: ['Calls'],
  endpoints: build => ({
    getCalls: build.query<ICalls, ICallsProps>({
      query: ({ dates }) => ({
        url: `getList?date_start=${dates.startDate}&date_end=${dates.endDate}`,
        method: 'POST',
      }),
      providesTags: ['Calls'],
    }),
    getAudio: build.query<any, IAudioProps>({
      query: ({ record, partnership_id }) => ({
        url: `getRecord?record=${record}&partnership_id=${partnership_id}`,
        method: 'POST',
        headers: {
          'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': `filename="record.mp3"`,
        },
        responseHandler: response => {
          return response.blob();
        },
        providesTags: ['Calls'],
      }),
    }),
    getSortCalls: build.query<ICalls, IFilterProps>({
      query: ({ dates, sortType }) => ({
        url: `getList?date_start=${dates.startDate}&date_end=${dates.endDate}&sort_by=${sortType}`,
        method: 'POST',
      }),
      providesTags: ['Calls'],
    }),
  }),
});

export const { useGetCallsQuery, useGetAudioQuery, useGetSortCallsQuery } = callsAPI;
