import { makeRequest, METHODS } from '@entando/apimanager';
import { WIDGET, WIDGET_LIST } from 'test/mocks/widgets';

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
    mockResponse: { ...WIDGET, customUi: '<div></div>' },
    useAuthentication: true,
  })
);

export const putWidgets = widgetObject => (
  makeRequest({
    uri: `/api/widgets/${widgetObject.code}`,
    method: METHODS.PUT,
    body: widgetObject,
    mockResponse: { ...WIDGET, code: `${widgetObject.code}`, customUi: '<div></div>' },
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
