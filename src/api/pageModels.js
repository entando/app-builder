import { makeRequest, METHODS } from 'api/apiManager';

import {
  PAGE_MODELS_LIST, COMPLEX_RESPONSE, SINGLE_CELL_RESPONSE, SIDEBAR_HOLES_RESPONSE,
  OVERLAPPING_FRAMES_RESPONSE, MISSING_SKETCH_RESPONSE,
} from 'test/mocks/pageModels';


export const getPageModels = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/pageModels${params}`,
      method: METHODS.GET,
      mockResponse: PAGE_MODELS_LIST,
      useAuthentication: true,
    },
    page,
  )
);

const pageModelMap = {
  [COMPLEX_RESPONSE.payload.code]: COMPLEX_RESPONSE,
  [SINGLE_CELL_RESPONSE.payload.code]: SINGLE_CELL_RESPONSE,
  [SIDEBAR_HOLES_RESPONSE.payload.code]: SIDEBAR_HOLES_RESPONSE,
  [OVERLAPPING_FRAMES_RESPONSE.payload.code]: OVERLAPPING_FRAMES_RESPONSE,
  [MISSING_SKETCH_RESPONSE.payload.code]: MISSING_SKETCH_RESPONSE,
};


export const getPageModel = pageModelCode => (
  makeRequest({
    uri: `/api/pageModels/${pageModelCode}`,
    method: METHODS.GET,
    mockResponse: pageModelMap[pageModelCode] || {},
    useAuthentication: true,
    errors: () => (pageModelMap[pageModelCode] ?
      [] :
      [{ code: 1, message: `Page model with code "${pageModelCode}" not found.` }]
    ),
  })
);

export const deletePageModel = pageModelCode => (
  makeRequest({
    uri: `/api/pageModels/${pageModelCode}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);
