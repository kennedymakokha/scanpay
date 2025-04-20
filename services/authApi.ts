import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

const baseUrl = 'https://api.marapesa.com/api';

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
    signup: builder.mutation({
      query: (body: User) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    activate: builder.mutation({
      query: (body: User) => ({
        url: '/auth/activate-user',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body: User) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getSession: builder.query({
      query: () => '/auth',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useActivateMutation,
  useSignupMutation,
  useLoginMutation,
  useGetSessionQuery,
  useLogoutMutation,
} = authApi;
