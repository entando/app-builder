const { APP_BUILDER_VERSION } = process.env;

export const appBuilderVersion = APP_BUILDER_VERSION || '';

// App Builder follows the Entando platform minor version (e.g. app-builder 7.5.3 -> Entando 7.5)
export const getEntandoVersion = (version = '') => {
  const [major, minor] = version.split('.');
  return major && minor ? `${major}.${minor}` : version;
};

export const entandoVersion = getEntandoVersion(appBuilderVersion);
