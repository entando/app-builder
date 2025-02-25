import { isURL } from 'validator';
import { ENTANDO_VIRTUAL_CONTEXT, getCookie } from './cookies';

const getProcessEnvVar = envVar => process.env[envVar] || '';

const getWindowEnvVar = envVar => (window && window.env && window.env[envVar] ? window.env[envVar] : '');

const getEnvVar = (envVar) => {
  if (process.env.NODE_ENV === 'development') {
    return getProcessEnvVar(envVar);
  }
  return getWindowEnvVar(envVar) || getProcessEnvVar(envVar);
};

const getBooleanEnvVar = envVar => String(getEnvVar(envVar)).toLowerCase() === 'true';

const validateDomain = (domain) => {
  const virtualContext = getCookie(ENTANDO_VIRTUAL_CONTEXT);
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
    // console.log('domain', domain);
    let domainWithContext = domain;
    if (virtualContext) {
      domainWithContext = `${domain}/${virtualContext}`;
    }
    console.log('domainWithContext', domainWithContext);
    return domainWithContext.replace(/\/+$/, '');
  }
  console.log('passo qui');
  if (virtualContext) return `/${virtualContext}`;
  return '';
};

export default () => ({
  COMPONENT_REPOSITORY_UI_ENABLED: getBooleanEnvVar('COMPONENT_REPOSITORY_UI_ENABLED'),
  DOMAIN: validateDomain(getEnvVar('DOMAIN')),
  KEYCLOAK_JSON: getEnvVar('KEYCLOAK_JSON') || `${validateDomain(getEnvVar('DOMAIN'))}/keycloak.json`,
});
