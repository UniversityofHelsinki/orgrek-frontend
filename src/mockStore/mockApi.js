import { delay, http, HttpResponse } from 'msw';
import format from 'date-fns/format';

const formatApiDate = (date) => format(date, 'd.M.yyyy');

const baseUrl = `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`;

export const mockGetNode = (nodeId, body) =>
  http.get(`${baseUrl}/node/${nodeId}`, () => HttpResponse.json(body));

export const mockGetAttributes = (nodeId, body, date) => {
  return http.get(
    `${baseUrl}/node/${nodeId}/virallinen/${formatApiDate(
      date || new Date()
    )}/attributes`,
    () => HttpResponse.json(body)
  );
};

export const mockPutNameAttributes = (nodeId) =>
  http.put(
    `${baseUrl}/node/${nodeId}/attributes/names`,
    async ({ request }) => {
      await delay(2000);
      return HttpResponse.json(await request.json());
    }
  );

export const mockGetTypeAttributes = (nodeId, body) =>
  http.get(`${baseUrl}/node/${nodeId}/attributes/types`, () =>
    HttpResponse.json(body)
  );

export const mockPutTypeAttributes = (nodeId) =>
  http.put(
    `${baseUrl}/node/${nodeId}/attributes/types`,
    async ({ request }) => {
      await delay(2000);
      return HttpResponse.json(await request.json());
    }
  );

export const mockGetValidHierarchyFilters = (date, body) =>
  http.get(`${baseUrl}/hierarchyFilters/${formatApiDate(date)}`, () =>
    HttpResponse.json(body)
  );

export const mockGetCodeAttributes = (nodeId, body) =>
  http.get(`${baseUrl}/node/${nodeId}/attributes/codes`, () =>
    HttpResponse.json(body)
  );

export const mockSaveCodeAttributes = (nodeId) =>
  http.put(
    `${baseUrl}/node/${nodeId}/attributes/codes`,
    async ({ request }) => {
      await delay(2000);
      return HttpResponse.json(await request.json());
    }
  );

export const mockGetOtherAttributes = (nodeId, selectedHierarchies, body) =>
  http.get(
    `${baseUrl}/node/${nodeId}/attributes/others/hierarchies/${selectedHierarchies}`,
    () => HttpResponse.json(body)
  );

export const mockSaveOtherAttributes = (nodeId) =>
  http.put(
    `${baseUrl}/node/${nodeId}/attributes/others`,
    async ({ request }) => {
      await delay(2000);
      return HttpResponse.json(await request.json());
    }
  );

export const mockGetAttributeKeys = ({ selectedHierarchies, sections }, body) =>
  http.get(
    `${baseUrl}/hierarchyFilters/${selectedHierarchies}/${
      (sections && sections.toString()) || 'virallinen'
    }/attributes/keys`,
    () => HttpResponse.json(body)
  );

export const mockGetFullNames = (nodeId, date, body) =>
  http.get(`${baseUrl}/node/fullname/${nodeId}/${formatApiDate(date)}`, () =>
    HttpResponse.json(body)
  );

export const mockGetAllFullNames = (nodeId, body) =>
  http.get(`${baseUrl}/node/fullname/all/${nodeId}`, () =>
    HttpResponse.json(body)
  );

export const mockGetFavorableFullNames = (nodeId, date, body) =>
  http.get(
    `${baseUrl}/node/fullname/favorable/${nodeId}/${formatApiDate(date)}`,
    () => HttpResponse.json(body)
  );

export const mockGetParents = (nodeId, date, hierarchies, body) =>
  http.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/parents/${hierarchies}`,
    () => HttpResponse.json(body)
  );

export const mockSaveParents = () =>
  http.put(`${baseUrl}/node/parents/update`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(await request.json());
  });

export const mockGetChildren = (nodeId, date, hierarchies, body) =>
  http.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/children/${hierarchies}`,
    () => HttpResponse.json(body)
  );

export const mockSaveChildren = () =>
  http.put(`${baseUrl}/node/children/update`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(await request.json());
  });

export const mockGetPredecessors = (nodeId, date, body) =>
  http.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/predecessors`,
    () => HttpResponse.json(body)
  );

export const mockGetSuccessors = (nodeId, date, body) =>
  http.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString('fi-FI')}/successors`,
    () => HttpResponse.json(body)
  );

export const mockSaveSuccessors = (nodeId) =>
  http.put(`${baseUrl}/node/${nodeId}/successors`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(await request.json());
  });

export const mockGetSectionTypeAttributes = (sectionType, body) =>
  http.get(`${baseUrl}/node/section/${sectionType}/attributes`, () =>
    HttpResponse.json(body)
  );

export const mockGetTree = ({ hierarchies, selectedDay }, body) =>
  http.get(
    `${baseUrl}/tree/${hierarchies}/${selectedDay.toLocaleDateString('FI-fi')}`,
    () => HttpResponse.json(body)
  );

export const mockGetNodeValidity = (id, body) =>
  http.get(`${baseUrl}/node/${id}`, () => HttpResponse.json(body));

export const mockSaveNodeValidity = (id) =>
  http.put(`${baseUrl}/node/${id}/update`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(await request.json());
  });

/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const mockGetParentsDeprecated = (nodeId, date, hierarchies, body) =>
  http.get(
    `${baseUrl}/node/parents/${nodeId}/${formatApiDate(date)}/${hierarchies}`,
    () => HttpResponse.json(body)
  );
