import { isURL } from 'validator';
// import { getEntandoVirtualContextFromCookies } from './cookies';
const getProcessEnvVar = envVar => process.env[envVar] || '';

const getWindowEnvVar = envVar => (window && window.env && window.env[envVar] ? window.env[envVar] : '');

const getEnvVar = (envVar) => {
  if (process.env.NODE_ENV === 'development') {
    return getProcessEnvVar(envVar);
  }
  return getWindowEnvVar(envVar) || getProcessEnvVar(envVar);
};

const getBooleanEnvVar = envVar => String(getEnvVar(envVar)).toLowerCase() === 'true';

const getContextFromURL = (pathname, entVirtualContexts) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];

  // const { ENTANDO_VIRTUAL_CONTEXTS } = getEnvVar('ENTANDO_VIRTUAL_CONTEXTS');
  // console.log('getContextFromURL ENTANDO_VIRTUAL_CONTEXTS', ENTANDO_VIRTUAL_CONTEXTS);
  const virtualContexts = entVirtualContexts.split(',');
  if (virtualContexts.includes(context)) return context;
  return '';
};

const validateDomain = (domain) => {
  const virtualContext = getContextFromURL(window.location.pathname, getEnvVar('ENTANDO_VIRTUAL_CONTEXTS'));
  if (domain) {
    const isValidURL = isURL(domain, {
      allow_protocol_relative_urls: true,
      require_host: false,
      require_tld: false,
      require_protocol: false,
    });
    if (!isValidURL) {
      throw new Error('The DOMAIN env variable is invalid.');
    }
    let domainWithContext = domain;
    if (virtualContext) {
      if (domain === '/') domainWithContext = `/${virtualContext}`;
      else domainWithContext = `${domain}/${virtualContext}`;
    }
    return domainWithContext.replace(/\/+$/, '');
  }
  if (virtualContext) {
    return `/${virtualContext}`;
  }

  return '';
};


export default () => ({
  COMPONENT_REPOSITORY_UI_ENABLED: getBooleanEnvVar('COMPONENT_REPOSITORY_UI_ENABLED'),
  DOMAIN: validateDomain(getEnvVar('DOMAIN')),
  KEYCLOAK_JSON: getEnvVar('KEYCLOAK_JSON') || `${validateDomain(getEnvVar('DOMAIN'))}/keycloak.json`,
  ENTANDO_VIRTUAL_CONTEXTS: getEnvVar('ENTANDO_VIRTUAL_CONTEXTS'),
  DOMAIN_CM: getEnvVar('DOMAIN_CM'),
});
