import getRuntimeEnv from 'helpers/getRuntimeEnv';

const getContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];

  const { ENTANDO_VIRTUAL_CONTEXTS } = getRuntimeEnv();
  const virtualContexts = ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return context;
  return '';
};


const getBaseUrlWithVirtualContext = (baseUrl) => {
  const virtualContext = getContextFromURL(window.location.pathname);
  return virtualContext ? `${baseUrl}/${virtualContext}` : baseUrl;
};

export { getBaseUrlWithVirtualContext, getContextFromURL };
