import { makeRequest, METHODS } from 'api/apiManager';
import { WIDGET, WIDGET_LIST, WIDGET_POST_PUT } from 'test/mocks/widgets';

const getGenericError = obj => (obj || (obj === '') ? [] : [{ code: 1, message: 'object is invalid' }]);


export const getWidget = widgetCode => (
  makeRequest({
    uri: `/api/widgets/${widgetCode}`,
    method: METHODS.GET,
    mockResponse: WIDGET,
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

export const postWidgets = widgetObject => (
  makeRequest({
    uri: '/api/widgets',
    method: METHODS.POST,
    body: widgetObject,
    mockResponse: WIDGET_POST_PUT,
    useAuthentication: true,
  })
);

export const putWidgets = (widgetCode, widgetObject) => (
  makeRequest({
    uri: `/api/widgets/${widgetCode}`,
    method: METHODS.PUT,
    body: widgetObject,
    mockResponse: WIDGET_POST_PUT,
    useAuthentication: true,
  })
);

export const deleteWidgets = widgetCode => (
  makeRequest({
    uri: `/api/widgets/${widgetCode}`,
    method: METHODS.DELETE,
    mockResponse: { code: widgetCode },
    useAuthentication: true,
  })
);
