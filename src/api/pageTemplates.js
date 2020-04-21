import { makeRequest, METHODS } from '@entando/apimanager';

import {
  PAGE_TEMPLATES_LIST, COMPLEX_PAYLOAD, SINGLE_CELL_PAYLOAD, SIDEBAR_HOLES_PAYLOAD,
  OVERLAPPING_FRAMES_PAYLOAD, MISSING_SKETCH_PAYLOAD, PAGE_REFS_MAP,
} from 'test/mocks/pageTemplates';


const pageTemplateMap = {
  [COMPLEX_PAYLOAD.code]: COMPLEX_PAYLOAD,
  [SINGLE_CELL_PAYLOAD.code]: SINGLE_CELL_PAYLOAD,
  [SIDEBAR_HOLES_PAYLOAD.code]: SIDEBAR_HOLES_PAYLOAD,
  [OVERLAPPING_FRAMES_PAYLOAD.code]: OVERLAPPING_FRAMES_PAYLOAD,
  [MISSING_SKETCH_PAYLOAD.code]: MISSING_SKETCH_PAYLOAD,
};

export const getPageTemplates = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest({
  uri: `/api/pageModels${params}`,
  method: METHODS.GET,
  mockResponse: PAGE_TEMPLATES_LIST,
  useAuthentication: true,
}, page);


export const getPageTemplate = pageTemplateCode => makeRequest({
  uri: `/api/pageModels/${pageTemplateCode}`,
  method: METHODS.GET,
  mockResponse: pageTemplateMap[pageTemplateCode] || {},
  useAuthentication: true,
  errors: () => (
    pageTemplateMap[pageTemplateCode] ?
      [] :
      [{ code: 1, message: `no page template with the code ${pageTemplateCode} could be found.` }]
  ),
});

export const deletePageTemplate = pageTemplateCode => (
  makeRequest({
    uri: `/api/pageModels/${pageTemplateCode}`,
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postPageTemplate = pageTemplate => makeRequest({
  uri: '/api/pageModels',
  body: pageTemplate,
  method: METHODS.POST,
  mockResponse: { ...pageTemplate },
  useAuthentication: true,
});

export const putPageTemplate = pageTemplate => makeRequest({
  uri: `/api/pageModels/${pageTemplate.code}`,
  body: pageTemplate,
  method: METHODS.PUT,
  mockResponse: { ...pageTemplate },
  useAuthentication: true,
});

export const getReferences = (entityName, mockRefs) =>
  (pageTemplateCode, page = { page: 1, pageSize: 10 }) => makeRequest(
    {
      uri: `/api/pageModels/${pageTemplateCode}/references/${entityName}`,
      method: METHODS.GET,
      mockResponse: mockRefs[pageTemplateCode] ? mockRefs[pageTemplateCode] || [] : [],
      useAuthentication: true,
    },
    page,
  );

export const getPageReferences = getReferences('PageManager', PAGE_REFS_MAP);
