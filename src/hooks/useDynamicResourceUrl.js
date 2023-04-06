import { useSelector } from 'react-redux';
import { getDomain } from 'helpers/resourcePath';

import { selectCurrentTenant } from 'state/multi-tenancy/selectors';

export const generateStaticAssetsUrl = ({ tenant, resource }) => {
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
    // please not that getDomain is not used here since the subpath
    // is already included in the resourcePath (e.g /entando-de-app)
    return `${resourcePath}${resource}`;
  }
  // if you are using multipass on local instance then replace <resources> with <cmsresources>
  const localResourceUrl = `${getDomain()}/resources/${resource}`;
  return process.env.NODE_ENV === 'production' ? `${getDomain()}/cmsresources/${resource}` : localResourceUrl;
};


export function useDynamicResourceUrl(resource) {
  const tenant = useSelector(selectCurrentTenant) || {};
  return generateStaticAssetsUrl({ tenant, resource });
}
