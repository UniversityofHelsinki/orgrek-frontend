import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  api401FailureCall,
  apiGetParentsSuccessCall,
} from '../actions/hierarchyAction';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`,
  }),
  tagTypes: [
    'NameAttributes',
    'Tree',
    'AttributeKeys',
    'TypeAttributes',
    'HierarchyFilters',
    'CodeAttributes',
    'Parents',
  ],
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
      query: ({ attributes, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/names`,
          method: 'PUT',
          body: attributes,
        };
      },
    }),
    getTypeAttributes: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'TypeAttributes', nodeId },
      ],
      query: (nodeId) => ({
        url: `node/${nodeId}/attributes/types`,
        method: 'GET',
      }),
    }),
    saveTypeAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'TypeAttributes', nodeId }, { type: 'Tree' }];
      },
      query: ({ valuesArray, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/types`,
          method: 'PUT',
          body: valuesArray,
        };
      },
    }),
    getValidHierarchyFilters: builder.query({
      providesTags: (result, error, nodeId) => [{ type: 'HierarchyFilters' }],
      query: () => {
        const dateString = new Date().toLocaleDateString('FI-fi');
        return {
          url: `hierarchyFilters/${dateString}`,
          method: 'GET',
        };
      },
    }),
    getCodeAttributes: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'CodeAttributes', id: nodeId },
      ],
      query: ({ nodeId }) => ({
        url: `/node/${nodeId}/attributes/codes`,
        method: 'GET',
      }),
    }),
    saveCodeAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'CodeAttributes', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ attributes, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/codes`,
          method: 'PUT',
          body: attributes,
        };
      },
    }),
    getAttributeKeys: builder.query({
      providesTags: (result, error, selectedHierarchies) => [
        { type: 'AttributeKeys', selectedHierarchies },
      ],
      query: ({ selectedHierarchies, sections }) => ({
        url: `/hierarchyFilters/${selectedHierarchies}/${sections.toString()}/attributes/keys`,
        method: 'GET',
      }),
    }),
    getAttributeKeysBySection: builder.query({
      query: (sectionType) => ({
        url: `/node/section/${sectionType}/attributes`,
        method: 'GET',
      }),
    }),
    getParents: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'Parents', id: nodeId },
      ],
      query: ({ nodeId, selectedDay, selectedHierarchies }) => {
        const dateString = selectedDay
          ? selectedDay.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        return {
          url: `/node/all/parents/${nodeId}/${dateString}/${selectedHierarchies}`,
          method: 'GET',
        };
      },
    }),
    saveParents: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Parents', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ edges }) => {
        return {
          url: `/node/parents/update`,
          method: 'PUT',
          body: edges,
        };
      },
    }),
  }),
});

export const {
  useGetNameAttributesQuery,
  useSaveNameAttributesMutation,
  useGetCodeAttributesQuery,
  useSaveCodeAttributesMutation,
  useGetAttributeKeysQuery,
  useGetTreeQuery,
  useGetTypeAttributesQuery,
  useGetValidHierarchyFiltersQuery,
  useSaveTypeAttributesMutation,
  useGetAttributeKeysBySectionQuery,
  useSaveParentsMutation,
  useGetParentsQuery,
} = api;
