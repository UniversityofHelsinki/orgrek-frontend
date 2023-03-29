import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`,
  }),
  tagTypes: ['NameAttributes', 'Tree'],
  endpoints: (builder) => ({
    getTree: builder.query({
      providesTags: (result, error) => [{ type: 'Tree' }],
      query: ({ hierarchies, selectedDay }) => {
        const dateString = selectedDay
          ? selectedDay.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        const selectableHierarchies = hierarchies
          .split(',')
          .filter((item) => item !== 'history');
        return {
          url: `/tree/${selectableHierarchies}/${dateString}`,
          method: 'GET',
        };
      },
    }),
    getNameAttributes: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'NameAttributes', nodeId },
      ],
      query: (nodeId) => ({
        url: `/node/${nodeId}/attributes/names`,
        method: 'GET',
      }),
    }),
    saveNameAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'NameAttributes', nodeId }, { type: 'Tree' }];
      },
      query: ({ cleanedAttributes, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/names`,
          method: 'PUT',
          body: cleanedAttributes,
        };
      },
    }),
  }),
});

export const {
  useGetNameAttributesQuery,
  useSaveNameAttributesMutation,
  useGetTreeQuery,
} = api;
