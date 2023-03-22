import { rest } from 'msw';

const baseUrl = `${process.env.REACT_APP_ORGREK_BACKEND_SERVER || ''}/api`;

export const mockGetNameAttributes = (nodeId, body) =>
  rest.get(`${baseUrl}/node/attributes/names/${nodeId}`, (req, res, ctx) =>
    res(ctx.json(body))
  );

export const mockPutNameAttributes = () =>
  rest.put(`${baseUrl}/node/attributes/names`, (req, res, ctx) =>
    res(ctx.delay(2000), ctx.json(req.json()))
  );
