import getRuntimeEnv from 'helpers/getRuntimeEnv';
import React from 'react';

const getContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];

  const { ENTANDO_VIRTUAL_CONTEXTS } = getRuntimeEnv();
  const virtualContexts = ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return context;
  return '';
};

// const setContextFromURL = (pathname) => {
//   const context = getContextFromURL(pathname);

//   if (!ENTANDO_VIRTUAL_CONTEXTS) return deleteEntandoVirtualContextFromCookies();
//   if (virtualContexts.includes(context)) return setEntandoVirtualContextInCookies(context);
//   // #$$$ root context => return setEntandoVirtualContextInCookies('ROOT');
//   return setEntandoVirtualContextInCookies('');
// };


const ContextProvider = ({ children }) => {
  React.useEffect(() => {
    // if (window.location.pathname) {
    //   setContextFromURL(window.location.pathname);
    // }

    // return () => {
    //   deleteEntandoVirtualContextFromCookies();
    // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const getBaseUrlWithVirtualContext = (baseUrl) => {
  const virtualContext = getContextFromURL(window.location.pathname);
  return virtualContext ? `${baseUrl}/${virtualContext}` : baseUrl;
};

export { ContextProvider, getBaseUrlWithVirtualContext, getContextFromURL };
