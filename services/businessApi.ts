import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

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
    registerbusiness: builder.mutation({
      query: (body: User) => ({
        url: '/business',
        method: 'POST',
        body,
      }),
    }),
    getbusiness: builder.query({
      query: () => '/business',
    }),
    updatebusiness: builder.mutation({
      query: (body: User) => ({
        url: `/business/${body.id}`,
        method: 'put',
        body,
      }),
    }),
    deletebusiness: builder.mutation({
      query: (body: User) => ({
        url: `/business/${body.id}`,
        method: 'delete',

      }),
    }),
    getonebusiness: builder.query({
      query: (id) => `/business/${id}`,
    }),

  }),
});

export const {
  useDeletebusinessMutation,
  useGetbusinessQuery,
  useGetonebusinessQuery,
  useRegisterbusinessMutation,
  useUpdatebusinessMutation
} = authApi;
