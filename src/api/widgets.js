import { makeMockRequest, METHODS } from 'api/apiManager';
import { WIDGET_LIST, WIDGETS_MAP } from 'test/mocks/widgetList';


export const getApiWidgetList = () => (
  new Promise((resolve) => {
    resolve(WIDGET_LIST);
  })
);

export const getWidget = widgetCode => (
  makeMockRequest({
    uri: `/api/widgets/${widgetCode}`,
    method: METHODS.GET,
    mockResponse: WIDGETS_MAP[widgetCode] || {},
    errors: () => (WIDGETS_MAP[widgetCode] ?
      [] :
      [{ code: 1, message: `Widget '${widgetCode}' not found` }]),
    useAuthentication: true,
  })
);
