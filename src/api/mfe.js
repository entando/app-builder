import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';
import { composeCMApiDomain } from 'helpers/apiDomainComposer';
import { getCookie, ENTANDO_VIRTUAL_CONTEXTS } from 'helpers/cookies';

// eslint-disable-next-line import/prefer-default-export
export const getMfeConfigList = (params = '') => (
  makeRequest({
    uri: `/bundles/all/widgets?filters[0].value=app-builder&filters[0].attribute=widgetType&filters[0].operator=eq${params}`,
    domain: composeCMApiDomain(getCookie(ENTANDO_VIRTUAL_CONTEXTS)),
    method: METHODS.GET,
    mockResponse: LIST_MFE_RESPONSE_OK,
    useAuthentication: true,
  })
);
