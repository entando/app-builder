// import { useLocation } from 'react-router-dom';
import { setCookie, ENTANDO_VIRTUAL_CONTEXT_KEY, deleteCookie, getCookie } from 'helpers/cookies';
import React from 'react';

const getContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  return pathFragments[publicUrlIndex + 1];
};

const setContextFromURL = (pathname) => {
  const context = getContextFromURL(pathname);
  if (!process.env.ENTANDO_VIRTUAL_CONTEXTS) return deleteCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);
  const virtualContexts = process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return setCookie(ENTANDO_VIRTUAL_CONTEXT_KEY, context);
  // #$$$ root context => return setCookie(ENTANDO_VIRTUAL_CONTEXT_KEY, '.root');
  return setCookie(ENTANDO_VIRTUAL_CONTEXT_KEY, '');
};


const ContextProvider = ({ children }) => {
  React.useEffect(() => {
    if (window.location.pathname) {
      setContextFromURL(window.location.pathname);
    }

    return () => {
      deleteCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const getBaseUrlWithVirtualContext = (baseUrl) => {
  const virtualContext = getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);
  return virtualContext ? `${baseUrl}/${virtualContext}` : baseUrl;
};

export { ContextProvider, getBaseUrlWithVirtualContext, getContextFromURL };
