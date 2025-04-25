import { api } from './index';
import { User } from '../../types';

export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    registerbusiness: builder.mutation({
      query: (body: User) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    getbusiness: builder.query({
      query: () => ({ url: '/' }),
    }),
    updatebusiness: builder.mutation({
      query: (body: User) => ({
        url: `/${body.id}`,
        method: 'put',
        body,
      }),
    }),
    deletebusiness: builder.mutation({
      query: (body: User) => ({
        url: `/${body.id}`,
        method: 'delete',

      }),
    }),
    getonebusiness: builder.query({
      query: (id) => `/${id}`,
    }),

  }),
});

export const {
  useDeletebusinessMutation,
  useGetbusinessQuery,
  useGetonebusinessQuery,
  useRegisterbusinessMutation,
  useUpdatebusinessMutation
} = injectEndpoints;
