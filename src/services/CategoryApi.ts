import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types';

const baseUrl = 'https://scanapi.marapesa.com/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include', // use this if your backend uses cookies
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    registervendor: builder.mutation({
      query: (body: User) => ({
        url: '/vendor',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
 
  useRegistervendorMutation,
 
} = authApi;
