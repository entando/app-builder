import { makeMockRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK, ADD_MFE_OK, UPDATE_MFE_OK } from 'test/mocks/mfe';

export const getMfeConfigList = (page = { page: 1, pageSize: 0 }, params = '') => (
  makeMockRequest(
    {
      uri: `/api/ecr/config-list${params}`,
      method: METHODS.GET,
      mockResponse: LIST_MFE_RESPONSE_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const addMfeConfig = mfeId => (
  makeMockRequest({
    uri: `/api/ecr/add-config/${mfeId}`,
    method: METHODS.GET,
    mockResponse: ADD_MFE_OK,
    useAuthentication: true,
  })
);

export const updateMfeConfig = (mfeId, version) => (
  makeMockRequest({
    uri: `/api/ecr/update-config/${mfeId}/${version}`,
    method: METHODS.GET,
    mockResponse: UPDATE_MFE_OK,
    useAuthentication: true,
  })
);
