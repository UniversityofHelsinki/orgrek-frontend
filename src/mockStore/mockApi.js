import { rest } from 'msw';
import format from 'date-fns/format';

const formatApiDate = (date) => format(date, 'd.M.yyyy');

const baseUrl = `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`;

export const mockGetNode = (nodeId, body) =>
  rest.get(`${baseUrl}/node/${nodeId}`, (req, res, ctx) => res(ctx.json(body)));

export const mockGetAttributes = (nodeId, body, date) => {
  return rest.get(
    `${baseUrl}/node/${nodeId}/virallinen/${formatApiDate(
      date || new Date()
    )}/attributes`,
    (req, res, ctx) => res(ctx.json(body))
  );
};

export const mockPutNameAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/attributes/names`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetTypeAttributes = (nodeId, body) =>
  rest.get(`${baseUrl}/node/${nodeId}/attributes/types`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockPutTypeAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/attributes/types`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetValidHierarchyFilters = (date, body) =>
  rest.get(
    `${baseUrl}/hierarchyFilters/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetCodeAttributes = (nodeId, body, date) =>
  rest.get(`${baseUrl}/node/${nodeId}/attributes/codes`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockSaveCodeAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/attributes/codes`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetOtherAttributes = (nodeId, selectedHierarchies, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/attributes/others/hierarchies/${selectedHierarchies}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockSaveOtherAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/attributes/others`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetAttributeKeys = ({ selectedHierarchies, sections }, body) =>
  rest.get(
    `${baseUrl}/hierarchyFilters/${selectedHierarchies}/${
      (sections && sections.toString()) || 'virallinen'
    }/attributes/keys`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetFullNames = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/fullname/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetAllFullNames = (nodeId, body) =>
  rest.get(`${baseUrl}/node/fullname/all/${nodeId}`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockGetFavorableFullNames = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/fullname/favorable/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetParents = (nodeId, date, hierarchies, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/parents/${hierarchies}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockSaveParents = () =>
  rest.put(`${baseUrl}/node/parents/update`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetChildren = (nodeId, date, hierarchies, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/children/${hierarchies}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockSaveChildren = () =>
  rest.put(`${baseUrl}/node/children/update`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetPredecessors = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString(
      'fi-FI'
    )}/predecessors`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetSuccessors = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/${date.toLocaleDateString('fi-FI')}/successors`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockSaveSuccessors = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/successors`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetSectionTypeAttributes = (sectionType, body) =>
  rest.get(
    `${baseUrl}/node/section/${sectionType}/attributes`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetTree = ({ hierarchies, selectedDay }, body) =>
  rest.get(
    `${baseUrl}/tree/${hierarchies}/${selectedDay.toLocaleDateString('FI-fi')}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetNodeValidity = (id, body) =>
  rest.get(`${baseUrl}/node/${id}`, (req, res, ctx) => res(ctx.json(body)));

export const mockSaveNodeValidity = (id) =>
  rest.put(`${baseUrl}/node/${id}/update`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const mockGetParentsDeprecated = (nodeId, date, hierarchies, body) =>
  rest.get(
    `${baseUrl}/node/parents/${nodeId}/${formatApiDate(date)}/${hierarchies}`,
    (req, res, ctx) => res(ctx.json(body))
  );
