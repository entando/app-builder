import getRuntimeEnv from 'helpers/getRuntimeEnv';

const getContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];

  const { AB_ENTANDO_VIRTUAL_CONTEXTS } = getRuntimeEnv();
  const virtualContexts = AB_ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return context;
  return '';
};

const getBaseUrlWithVirtualContext = (baseUrl) => {
  const virtualContext = getContextFromURL(window.location.pathname);
  return virtualContext ? `${baseUrl}/${virtualContext}` : baseUrl;
};

/**
 * Derives from the current browser location a good landing URL for the given context.
 * If precise=true the URL should resemble the current one,
 * otherwise it's a shorter and safer version.
 *
 * @param {string} fromContext    the current context
 * @param {string} toContext      the target context
 * @param {boolean} precise       if true tries to derive URL closer to the current one
 * @returns
 */
function determineBestLandingUrl(fromContext, toContext, precise) {
  const toContextPath = toContext === 'ROOT' ? '' : toContext;
  const pathFragments = window.location.pathname.split('/');
  const expectedPublicUrl = process.env.PUBLIC_URL.replace('/', '').trim();

  const publicUrlInc = expectedPublicUrl ? 1 : 0;
  const remainingPathInc = fromContext ? 2 : 1;

  const newBasePath = pathFragments.slice(0, 1 + publicUrlInc).concat(toContextPath);

  const remainingPath = precise
    ? pathFragments.slice(remainingPathInc + publicUrlInc, remainingPathInc + publicUrlInc + 1)
    : [];

  return [window.origin].concat(newBasePath).concat(remainingPath).filter(el => el !== '').join('/');
}


export { getBaseUrlWithVirtualContext, getContextFromURL, determineBestLandingUrl };
