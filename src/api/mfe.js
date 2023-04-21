import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

// eslint-disable-next-line import/prefer-default-export
export const getMfeConfigList = (params = '') => (
  makeRequest({
    uri: `/bundles/all/widgets?filters%5B0%5D.value=app-builder&filters%5B0%5D.attribute=widgetType&filters%5B0%5D.operator=eq${params}`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: LIST_MFE_RESPONSE_OK,
    useAuthentication: true,
  })
);
