import { useSelector } from 'react-redux';
import { getDomain } from 'helpers/resourcePath';

import { selectCurrentTenant } from 'state/multi-tenancy/selectors';

export const generateUrlFromTenantAndResource = ({ tenant, resource }) => {
  console.log('generateUrlFromTenantAndResource', tenant, resource);
  const resourceUrl = tenant.resourceRootUrl || '';
  const resourcePath = tenant.resourceRootPath || '';
  // used for mfe local development testing
  if (process.env.USE_LOCAL_MFE) {
    console.log('returning local resource', resource);
    return resource;
  }
  if (process.env.USE_REMOTE_MFE) {
    console.log('returning remote resource', `${getDomain()}/cmsresources/${resource}`);
    return `${getDomain()}/cmsresources/${resource}`;
  }
  if (resourceUrl) {
    console.log('returning resourceUrl', `${resourceUrl}/${resource}`);
    return `${resourceUrl}/${resource}`;
  }
  if (resourcePath) {
    // please not that getDomain is not used here since the subpath
    // is already included in the resourcePath (e.g /entando-de-app)
    console.log('returning resourcePath', `${resourcePath}${resource}`);
    return `${resourcePath}${resource}`;
  }
  // if you are using multipass on local instance then replace <resources> with <cmsresources>
  const localResourceUrl = `${getDomain()}/resources/${resource}`;
  console.log('logging localResourceUrl', localResourceUrl);
  console.log('final output is: ', process.env.NODE_ENV === 'production' ? `${getDomain()}/cmsresources/${resource}` : localResourceUrl);
  return process.env.NODE_ENV === 'production' ? `${getDomain()}/cmsresources/${resource}` : localResourceUrl;
};


export function useDynamicResourceUrl(resource) {
  const tenant = useSelector(selectCurrentTenant) || {};
  console.log('useDynamicResourceUrl', tenant, resource);
  return generateUrlFromTenantAndResource({ tenant, resource });
}
