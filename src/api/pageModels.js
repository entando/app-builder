import { makeRequest, METHODS } from 'api/apiManager';

import {
  GET_LIST_RESPONSE, COMPLEX_PAYLOAD, SINGLE_CELL_RESPONSE, SIDEBAR_HOLES_RESPONSE,
  OVERLAPPING_FRAMES_RESPONSE, MISSING_SKETCH_RESPONSE,
} from 'test/mocks/pageModels';


const pageModelMap = {
  [COMPLEX_PAYLOAD.code]: COMPLEX_PAYLOAD,
  [SINGLE_CELL_RESPONSE.payload.code]: SINGLE_CELL_RESPONSE,
  [SIDEBAR_HOLES_RESPONSE.payload.code]: SIDEBAR_HOLES_RESPONSE,
  [OVERLAPPING_FRAMES_RESPONSE.payload.code]: OVERLAPPING_FRAMES_RESPONSE,
  [MISSING_SKETCH_RESPONSE.payload.code]: MISSING_SKETCH_RESPONSE,
};

export const getPageModels = () => makeRequest({
  uri: '/api/pagemodels',
  method: METHODS.GET,
  mockResponse: GET_LIST_RESPONSE.payload,
  useAuthentication: true,
});


export const getPageModel = code => makeRequest({
  uri: `/api/pagemodels/${code}`,
  method: METHODS.GET,
  mockResponse: pageModelMap[code] || {},
  useAuthentication: true,
  errors: () => (
    pageModelMap[code] ?
      [] :
      [{ code: 1, message: `no page model with the code ${code} could be found.` }]
  ),
});
