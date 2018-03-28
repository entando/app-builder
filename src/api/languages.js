
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LANGUAGES_LIST } from 'test/mocks/languages';

export const getLanguages = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeMockRequest(
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
  makeMockRequest({
    uri: `/api/languages/${languageObj.code}`,
    method: METHODS.PUT,
    body: languageObj,
    mockResponse: [],
    useAuthentication: true,
  })
);
