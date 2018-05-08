
import { makeRequest, METHODS } from '@entando/apimanager';
import { LANGUAGES_LIST } from 'test/mocks/languages';

export const getLanguages =
(page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/languages${params}`,
      method: METHODS.GET,
      mockResponse: LANGUAGES_LIST,
      useAuthentication: true,
    },
    page,
  )
);

export const putLanguage = languageObj => (
  makeRequest({
    uri: `/api/languages/${languageObj.code}`,
    method: METHODS.PUT,
    body: languageObj,
    mockResponse: [],
    useAuthentication: true,
  })
);
