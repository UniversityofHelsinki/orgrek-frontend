import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`,
  }),
  tagTypes: ['NameAttributes'],
  endpoints: (builder) => ({
    getNameAttributes: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'NameAttributes', nodeId },
      ],
      query: (nodeId) => ({
        url: `/node/attributes/names/${nodeId}`,
        method: 'GET',
      }),
    }),
    saveNameAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'NameAttributes', nodeId }];
      },
      query: ({ combinedArrays }) => {
        return {
          url: `/node/attributes/names`,
          method: 'PUT',
          body: combinedArrays,
        };
      },
    }),
  }),
});

export const { useGetNameAttributesQuery, useSaveNameAttributesMutation } = api;
