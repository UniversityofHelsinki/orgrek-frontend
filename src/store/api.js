import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    'NodeValidity',
    'Parents',
    'NodeOtherAttributes',
    'SaveNodeOtherAttributes',
    'Successors',
    'SectionAttributes',
    'TextAttributes',
  ],
  endpoints: (builder) => ({
    getTree: builder.query({
      providesTags: () => [{ type: 'Tree' }],
      query: ({ hierarchies, selectedDay }) => {
        const dateString = selectedDay
          ? selectedDay.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        const selectableHierarchies = hierarchies
          .split(',')
          .filter((item) => item !== 'history')
          .filter((item) => item !== 'select-all');
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
    getHierarchyFilters: builder.query({
      providesTags: () => [{ type: 'HierarchyFilters' }],
      query: () => {
        return {
          url: `hierarchyFilters`,
          method: 'GET',
        };
      },
    }),
    getValidHierarchyFilters: builder.query({
      providesTags: () => [{ type: 'HierarchyFilters' }],
      query: () => {
        const dateString = new Date().toLocaleDateString('FI-fi');
        return {
          url: `hierarchyFilters/${dateString}`,
          method: 'GET',
        };
      },
    }),
    saveHierarchyFilters: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'HierarchyFilters' }];
      },
      query: ({ data }) => {
        return {
          url: `/hierarchyFilters`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteHierarchyFilters: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'HierarchyFilters' }];
      },
      query: ({ data }) => {
        return {
          url: `/hierarchyFilters`,
          method: 'DELETE',
          body: data,
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
    getNodeOtherAttributes: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'NodeOtherAttributes', id: nodeId },
      ],
      query: ({ nodeId, selectedHierarchies }) => {
        return {
          url: `/node/${nodeId}/attributes/others/hierarchies/${selectedHierarchies}`,
          method: 'GET',
        };
      },
    }),
    saveNodeOtherAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'NodeOtherAttributes', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ valuesArray, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/others`,
          method: 'PUT',
          body: valuesArray,
        };
      },
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
    getNodeValidity: builder.query({
      providesTags: (result, error, id) => [{ type: 'NodeValidity', id }],
      query: (id) => ({
        url: `/node/${id}`,
        method: 'GET',
      }),
    }),
    saveNodeValidity: builder.mutation({
      invalidatesTags: (result, error, { id }) => {
        if (error) {
          return [];
        }
        return [{ type: 'NodeValidity', id }, { type: 'Tree' }];
      },
      query: ({ data, id }) => {
        return {
          url: `/node/${id}/update`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    getSuccessors: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'Successors', id: nodeId },
      ],
      query: (nodeId) => {
        return {
          url: `/node/successors/${nodeId}`,
          method: 'GET',
        };
      },
    }),
    saveSuccessors: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Successors', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ successors }) => {
        return {
          url: `/node/successor`,
          method: 'PUT',
          body: successors,
        };
      },
    }),
    saveChild: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Tree' }];
      },
      query: ({ data, id }) => {
        return {
          url: `/node/${id}/insert`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getSectionAttributes: builder.query({
      providesTags: () => [{ type: 'SectionAttributes' }],
      query: () => {
        return {
          url: `/section/all`,
          method: 'GET',
        };
      },
    }),
    getTextAttributes: builder.query({
      providesTags: () => [{ type: 'TextAttributes' }],
      query: () => {
        return {
          url: `/texts`,
          method: 'GET',
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
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
  useDeleteHierarchyFiltersMutation,
  useGetValidHierarchyFiltersQuery,
  useSaveTypeAttributesMutation,
  useGetAttributeKeysBySectionQuery,
  useGetNodeValidityQuery,
  useSaveNodeValidityMutation,
  useSaveParentsMutation,
  useGetParentsQuery,
  useGetNodeOtherAttributesQuery,
  useSaveNodeOtherAttributesMutation,
  useGetSuccessorsQuery,
  useSaveSuccessorsMutation,
  useSaveChildMutation,
  useGetSectionAttributesQuery,
  useGetTextAttributesQuery,
} = api;
