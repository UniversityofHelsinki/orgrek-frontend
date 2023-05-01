import { rest } from 'msw';
import format from 'date-fns/format';

const formatApiDate = (date) => format(date, 'd.M.yyyy');

const baseUrl = `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`;

export const mockGetNode = (nodeId, body) =>
  rest.get(`${baseUrl}/node/${nodeId}`, (req, res, ctx) => res(ctx.json(body)));

export const mockGetNameAttributes = (nodeId, body) =>
  rest.get(`${baseUrl}/node/${nodeId}/attributes/names`, (req, res, ctx) =>
    res(ctx.json(body))
  );

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

export const mockGetCodeAttributes = (nodeId, body) =>
  rest.get(`${baseUrl}/node/${nodeId}/attributes/codes`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockSaveCodeAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/${nodeId}/attributes/codes`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );

export const mockGetAttributeKeys = ({ selectedHierarchies, sections }, body) =>
  rest.get(
    `${baseUrl}/hierarchyFilters/${selectedHierarchies}/${
      (sections && sections.toString()) || 'talous'
    }/attributes/keys`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetFullNames = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/fullname/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetFavorableFullNames = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/fullname/favorable/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetParents = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/parents/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetChildren = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/children/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetPredecessors = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/predecessors/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
  );

export const mockGetSuccessors = (nodeId, date, body) =>
  rest.get(
    `${baseUrl}/node/successors/${nodeId}/${formatApiDate(date)}`,
    (req, res, ctx) => res(ctx.json(body))
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

/**
 * @deprecated not needed after everything has been migrated to RTK Query
 */
export const mockGetAttributes = (nodeId, date, hierarchies, body) =>
  rest.get(
    `${baseUrl}/node/${nodeId}/${formatApiDate(
      date
    )}/${hierarchies}/attributes`,
    (req, res, ctx) => res(ctx.json(body))
  );
