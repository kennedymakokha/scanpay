import { api } from './index';
import { User } from '../../types';

export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    registervendor: builder.mutation({
      query: (body: User) => ({
        url: '/vendor',
        method: 'POST',
        body,
      }),
    })
  }),

});

export const {

  useRegistervendorMutation,


} = injectEndpoints;
