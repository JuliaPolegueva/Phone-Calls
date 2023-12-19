import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAudio, ICalls } from '../../types/call.types';

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
    getCalls: build.query<ICalls, void>({
      query: () => ({
        url: `getList`,
        method: 'POST',
      }),
      providesTags: ['Calls'],
    }),
    getAudio: build.query<any, IAudio>({
      query: ({ record, partnership_id }) => ({
        url: `getRecord?record=${record}&partnership_id=${partnership_id}`,
        method: 'POST',
        headers: {
          'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': `filename="record.mp3"`,
        },
        responseHandler: (response) => {
          console.log(response);
          return response.blob()//.then((qwe) => {
            //const asd = new Audio(URL.createObjectURL(qwe));
            //const zxc = (URL.createObjectURL(qwe));
            //return asd
         //})
        },
        providesTags: ['Calls'],
      }),
    }),
  }),
});

export const { useGetCallsQuery, useGetAudioQuery } = callsAPI;
