import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_MENU } from 'test/mocks/mfe';

// eslint-disable-next-line import/prefer-default-export
export const getMfeConfigList = (params = '') => (
  makeMockRequest({
    uri: `/bundles/all/widgets?filters[0].value=app-builder&filters[0].attribute=widgetType&filters[0].operator=eq${params}`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: LIST_MFE_MENU,
    useAuthentication: true,
  })
);
