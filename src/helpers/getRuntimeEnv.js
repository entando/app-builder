import { isURL } from 'validator';

const getEnvVar = (envVar) => {
  const nullableEnvVar = window && window.env ? window.env[envVar] : process.env[envVar];
  return nullableEnvVar || '';
};

const getBooleanEnvVar = envVar => getEnvVar(envVar).toLowerCase() === 'true';

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
  LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED: getBooleanEnvVar('LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED'),
});
