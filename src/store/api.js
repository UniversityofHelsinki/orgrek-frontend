/* eslint-disable max-lines */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`,
  }),
  tagTypes: [
    'Attributes',
    'Tree',
    'HierarchyFilters',
    'NodeValidity',
    'Parents',
    'Children',
    'SaveNodeOtherAttributes',
    'Predecessors',
    'Successors',
    'SectionAttributes',
    'TextAttributes',
    'EdgeHierarchies',
    'Texts',
    'HierarchyPublicities',
    'FullNames',
    'FavorableFullNames',
  ],
  // eslint-disable-next-line max-lines-per-function
  endpoints: (builder) => ({
    getTree: builder.query({
      providesTags: () => [{ type: 'Tree' }],
      query: ({ hierarchies, selectedDay }) => {
        const dateString = selectedDay
          ? selectedDay.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        const selectableHierarchies = hierarchies
          .filter((item) => item !== 'history')
          .filter((item) => item !== 'select-all');
        return {
          url: `/tree/${selectableHierarchies}/${dateString}`,
          method: 'GET',
        };
      },
    }),
    getFullNames: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'FullNames', id: nodeId },
      ],
      query: (nodeId) => ({
        url: `/node/fullname/all/${nodeId}`,
        method: 'GET',
      }),
    }),
    getFavorableFullNames: builder.query({
      providesTags: (result, error, nodeId) => [
        { type: 'FavorableFullNames', id: nodeId },
      ],
      query: ({ nodeId, date }) => {
        return {
          url: `/node/fullname/favorable/${nodeId}/${date.toLocaleDateString(
            'fi-FI'
          )}`,
          method: 'GET',
        };
      },
    }),
    getAttributes: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'Attributes', id: nodeId },
      ],
      query: ({ nodeId, hierarchies, date }) => ({
        url: `/node/${nodeId}/${hierarchies}/${date.toLocaleDateString(
          'fi-FI'
        )}/attributes`,
        method: 'GET',
      }),
    }),
    saveNameAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Attributes', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ attributes, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/names`,
          method: 'PUT',
          body: attributes,
        };
      },
    }),
    saveTypeAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Attributes', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ valuesArray, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/types`,
          method: 'PUT',
          body: valuesArray,
        };
      },
    }),
    getAttributeOrders: builder.query({
      providesTags: () => [{ type: 'AttributeOrders' }],
      query: () => {
        return {
          url: `attributeorder`,
          method: 'GET',
        };
      },
    }),
    insertAttributeOrder: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'AttributeOrders' }];
      },
      query: ({ data }) => {
        return {
          url: `attributeorder`,
          method: 'POST',
          body: data,
        };
      },
    }),
    deleteAttributeOrder: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'AttributeOrders' }];
      },
      query: ({ data }) => {
        return {
          url: `attributeorder`,
          method: 'DELETE',
          body: data,
        };
      },
    }),
    updateAttributeOrder: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'AttributeOrders' }];
      },
      query: ({ data }) => {
        return {
          url: 'attributeorder',
          method: 'PUT',
          body: data,
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
        return { url: `/hierarchyFilters`, method: 'PUT', body: data };
      },
    }),
    insertHierarchyFilters: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'HierarchyFilters' }];
      },
      query: ({ data }) => {
        return { url: `/hierarchyFilters`, method: 'POST', body: data };
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
    saveCodeAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Attributes', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ attributes, nodeId }) => {
        return {
          url: `/node/${nodeId}/attributes/codes`,
          method: 'PUT',
          body: attributes,
        };
      },
    }),
    getDistinctNodeAttributes: builder.query({
      providesTags: () => [{ type: 'DistinctNodeAttributes' }],
      query: () => {
        return {
          url: `/node/attributes/distinctattributes`,
          method: 'GET',
        };
      },
    }),
    saveNodeOtherAttributes: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Attributes', id: nodeId }, { type: 'Tree' }];
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
      query: ({ nodeId, date, hierarchies }) => {
        const dateString = date
          ? date.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        return {
          url: `/node/${nodeId}/${dateString}/parents/${hierarchies}`,
          method: 'GET',
        };
      },
    }),
    getHierarchyTypes: builder.query({
      providesTags: () => [{ type: 'HierarchyTypes' }],
      query: () => {
        return {
          url: `/hierarchy/types`,
          method: 'GET',
        };
      },
    }),
    getEdgeHierarchies: builder.query({
      providesTags: () => [{ type: 'EdgeHierarchiesNoHistory' }],
      query: () => {
        return {
          url: `/edge/edgehierarchies`,
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
    getChildren: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'Children', id: nodeId },
      ],
      query: ({ nodeId, date, hierarchies }) => {
        const dateString = date
          ? date.toLocaleDateString('FI-fi')
          : new Date().toLocaleDateString('FI-fi');
        return {
          url: `/node/${nodeId}/${dateString}/children/${hierarchies}`,
          method: 'GET',
        };
      },
    }),
    saveChildren: builder.mutation({
      invalidatesTags: (result, error, { nodeId }) => {
        if (error) {
          return [];
        }
        return [{ type: 'Children', id: nodeId }, { type: 'Tree' }];
      },
      query: ({ edges }) => {
        return {
          url: `/node/children/update`,
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
    getPredecessors: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'Predecessors', id: nodeId },
      ],
      query: ({ nodeId, date }) => {
        return {
          url: `/node/${nodeId}/${date.toLocaleDateString(
            'fi-FI'
          )}/predecessors`,
          method: 'GET',
        };
      },
    }),
    getSuccessors: builder.query({
      providesTags: (result, error, { nodeId }) => [
        { type: 'Successors', id: nodeId },
      ],
      query: ({ nodeId, date }) => {
        return {
          url: `/node/${nodeId}/${date.toLocaleDateString('fi-FI')}/successors`,
          method: 'GET',
        };
      },
    }),
    saveSuccessors: builder.mutation({
      invalidatesTags: (result, error, { successors, nodeId }) => {
        if (error) {
          return [];
        }
        const predecessorTags = successors.map((s) => ({
          type: 'Predecessors',
          id: s.childUniqueId,
        }));
        return [
          ...predecessorTags,
          { type: 'Successors', id: nodeId },
          { type: 'Tree' },
        ];
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
    getDistinctSectionAttributes: builder.query({
      providesTags: () => [{ type: 'DistinctSectionAttributes' }],
      query: () => {
        return {
          url: `/node/section/alldistinct`,
          method: 'GET',
        };
      },
    }),
    updateSectionAttribute: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'SectionAttributes' }];
      },
      query: ({ data }) => {
        return {
          url: `/section/update`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    insertSectionAttribute: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'SectionAttributes' }];
      },
      query: ({ data }) => {
        return {
          url: `/section/insert`,
          method: 'POST',
          body: data,
        };
      },
    }),
    deleteSectionAttribute: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'SectionAttributes' }];
      },
      query: ({ id }) => {
        return {
          url: `/section/${id}/delete`,
          method: 'DELETE',
        };
      },
    }),
    getTexts: builder.query({
      providesTags: () => [{ type: 'Texts' }],
      query: () => {
        return {
          url: `/texts`,
          method: 'GET',
        };
      },
    }),
    insertTexts: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Texts' }];
      },
      query: (texts) => {
        return {
          url: '/texts',
          method: 'POST',
          body: texts,
        };
      },
    }),
    updateText: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Texts' }];
      },
      query: (text) => {
        return {
          url: '/texts',
          method: 'PUT',
          body: text,
        };
      },
    }),
    deleteText: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Texts' }];
      },
      query: (text) => {
        return {
          url: '/texts',
          method: 'DELETE',
          body: text,
        };
      },
    }),
    getHierarchyPublicities: builder.query({
      providesTags: () => [{ type: 'HierarchyPublicities' }],
      query: () => {
        return {
          url: '/hierarchy/publicityList',
          method: 'GET',
        };
      },
    }),
    updateHierarchyPublicity: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'HierarchyPublicities' }];
      },
      query: (hierarchyPublicity) => {
        return {
          url: '/hierarchy/updatePublicity',
          method: 'PUT',
          body: hierarchyPublicity,
        };
      },
    }),
    insertHierarchyPublicity: builder.mutation({
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'HierarchyPublicities' }];
      },
      query: (hierarchyPublicity) => {
        return {
          url: '/hierarchy/insertPublicity',
          method: 'POST',
          body: hierarchyPublicity,
        };
      },
    }),
  }),
});

export const {
  useGetAttributesQuery,
  useGetFavorableFullNamesQuery,
  useGetFullNamesQuery,
  useSaveNameAttributesMutation,
  useSaveCodeAttributesMutation,
  useGetTreeQuery,
  useGetHierarchyFiltersQuery,
  useSaveHierarchyFiltersMutation,
  useInsertHierarchyFiltersMutation,
  useDeleteHierarchyFiltersMutation,
  useGetValidHierarchyFiltersQuery,
  useSaveTypeAttributesMutation,
  useGetNodeValidityQuery,
  useSaveNodeValidityMutation,
  useSaveParentsMutation,
  useGetParentsQuery,
  useGetDistinctNodeAttributesQuery,
  useGetDistinctSectionAttributesQuery,
  useSaveNodeOtherAttributesMutation,
  useGetPredecessorsQuery,
  useGetSuccessorsQuery,
  useSaveSuccessorsMutation,
  useSaveChildMutation,
  useSaveChildrenMutation,
  useGetChildrenQuery,
  useGetSectionAttributesQuery,
  useUpdateSectionAttributeMutation,
  useDeleteSectionAttributeMutation,
  useInsertSectionAttributeMutation,
  useGetHierarchyTypesQuery,
  useGetEdgeHierarchiesQuery,
  useGetTextsQuery,
  useInsertTextsMutation,
  useUpdateTextMutation,
  useDeleteTextMutation,
  useGetHierarchyPublicitiesQuery,
  useInsertHierarchyPublicityMutation,
  useUpdateHierarchyPublicityMutation,
  useGetAttributeOrdersQuery,
  useInsertAttributeOrderMutation,
  useDeleteAttributeOrderMutation,
  useUpdateAttributeOrderMutation,
} = api;
