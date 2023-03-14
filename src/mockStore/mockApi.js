import { rest } from 'msw';

const baseUrl = `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`;

export const mockGetNameAttributes = (nodeId, body) =>
  rest.get(`${baseUrl}/node/attributes/names/${nodeId}`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockPutNameAttributes = (nodeId) =>
  rest.put(`${baseUrl}/node/attributes/names/${nodeId}`, (req, res, ctx) =>
    res(ctx.json(req.json()))
  );
