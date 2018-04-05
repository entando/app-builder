import { makeRequest, METHODS } from 'api/apiManager';
import { BODY_OK, WIDGET_LIST } from 'test/mocks/widgets';

const getGenericError = obj => (obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]);


export const getWidget = widgetCode => (
  makeRequest({
    uri: `/api/widgets/${widgetCode}`,
    method: METHODS.GET,
    mockResponse: BODY_OK,
    useAuthentication: true,
    errors: () => getGenericError(widgetCode),
  })
);


export const getWidgets = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/widgets${params}`,
      method: METHODS.GET,
      mockResponse: WIDGET_LIST.payload,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);
