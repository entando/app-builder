import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

// eslint-disable-next-line import/prefer-default-export
export const getMfeConfigList = (page = { page: 1, pageSize: 0 }, params = '') => (
  makeMockRequest(
    {
      uri: `api/ecr/config-list${params}`,
      method: METHODS.GET,
      mockResponse: LIST_MFE_RESPONSE_OK,
      useAuthentication: true,
    },
    page,
  )
);
