import { isURL } from 'validator';

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
    return domain.replace(/\/+$/, '');
  }
  return '';
};

export default () => ({
  COMPONENT_REPOSITORY_UI_ENABLED: getBooleanEnvVar('COMPONENT_REPOSITORY_UI_ENABLED'),
  DOMAIN: validateDomain(getEnvVar('DOMAIN')),
  KEYCLOAK_JSON: getEnvVar('KEYCLOAK_JSON') || `${validateDomain(getEnvVar('DOMAIN'))}/keycloak.json`,
  WEBUI_ENABLED: getBooleanEnvVar('WEBUI_ENABLED'),
  WEBUI_APP_MANAGEMENT_URL: getEnvVar('WEBUI_APP_MANAGEMENT_URL'),
  WEBUI_APP_URL: getEnvVar('WEBUI_APP_URL'),
  WEBUI_DEV_WORKSPACE_URL: getEnvVar('WEBUI_DEV_WORKSPACE_URL'),
});
