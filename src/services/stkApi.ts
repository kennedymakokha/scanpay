import { api } from './index';
;

export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    pay: builder.mutation({
      query: (body) => ({
        url: '/stk/pay',
        method: 'POST',
        body,
      }),
    }),
    getlogs: builder.query({
      query: (data) => ({ url: `/stk/mpesa-logs?limit=${data.limit}page=${data.page}` }),
    }),

  }),
});

export const {
  useGetlogsQuery,
  usePayMutation
} = injectEndpoints;
