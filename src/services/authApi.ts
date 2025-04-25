import { api } from './index'
import { User } from '../../types';
export const injectEndpoints = api.injectEndpoints({
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
} = injectEndpoints;
