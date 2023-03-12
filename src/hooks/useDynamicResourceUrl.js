import { useSelector } from 'react-redux';
import { getDomain } from 'helpers/resourcePath';

import { selectCurrentTenant } from 'state/multi-tenancy/selectors';

export const generateUrlFromTenantAndResource = ({ tenant, resource }) => {
  const resourceUrl = tenant.resourceRootUrl || '';
  const resourcePath = tenant.resourceRootPath || '';
  // used for mfe local development testing
  if (process.env.USE_LOCAL_MFE) {
    return resource;
  }
  if (process.env.USE_REMOTE_MFE) {
    return `${getDomain()}/cmsresources/${resource}`;
  }
  if (resourceUrl) {
    return `${resourceUrl}/${resource}`;
  }
  if (resourcePath) {
    return `${getDomain()}${resourcePath}${resource}`;
  }
  return process.env.NODE_ENV === 'production' ? `${getDomain()}/cmsresources/${resource}` : `${getDomain()}/resources/${resource}`;
};


export function useDynamicResourceUrl(resource) {
  const tenant = useSelector(selectCurrentTenant) || {};
  return generateUrlFromTenantAndResource({ tenant, resource });
}
