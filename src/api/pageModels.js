import { makeRequest, METHODS } from 'api/apiManager';

import {
  PAGE_MODELS_LIST, COMPLEX_PAYLOAD, SINGLE_CELL_PAYLOAD, SIDEBAR_HOLES_PAYLOAD,
  OVERLAPPING_FRAMES_PAYLOAD, MISSING_SKETCH_PAYLOAD,
} from 'test/mocks/pageModels';


const pageModelMap = {
  [COMPLEX_PAYLOAD.code]: COMPLEX_PAYLOAD,
  [SINGLE_CELL_PAYLOAD.code]: SINGLE_CELL_PAYLOAD,
  [SIDEBAR_HOLES_PAYLOAD.code]: SIDEBAR_HOLES_PAYLOAD,
  [OVERLAPPING_FRAMES_PAYLOAD.code]: OVERLAPPING_FRAMES_PAYLOAD,
  [MISSING_SKETCH_PAYLOAD.code]: MISSING_SKETCH_PAYLOAD,
};

export const getPageModels = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest({
  uri: `/api/pageModels${params}`,
  method: METHODS.GET,
  mockResponse: PAGE_MODELS_LIST,
  useAuthentication: true,
}, page);


export const getPageModel = pageModelCode => makeRequest({
  uri: `/api/pageModels/${pageModelCode}`,
  method: METHODS.GET,
  mockResponse: pageModelMap[pageModelCode] || {},
  useAuthentication: true,
  errors: () => (
    pageModelMap[pageModelCode] ?
      [] :
      [{ code: 1, message: `no page model with the code ${pageModelCode} could be found.` }]
  ),
});

export const deletePageModel = pageModelCode => (
  makeRequest({
    uri: `/api/pageModels/${pageModelCode}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postPageModel = pageModel => makeRequest({
  uri: '/api/pageModels',
  body: pageModel,
  method: METHODS.POST,
  mockResponse: { ...pageModel },
  useAuthentication: true,
});

export const putPageModel = pageModel => makeRequest({
  uri: `/api/pageModels/${pageModel.code}`,
  body: pageModel,
  method: METHODS.PUT,
  mockResponse: { ...pageModel },
  useAuthentication: true,
});
