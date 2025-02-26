import { getEntandoVirtualContextFromCookies, setEntandoVirtualContextInCookies, deleteEntandoVirtualContextFromCookies } from 'helpers/cookies';
import React from 'react';

const getContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  return pathFragments[publicUrlIndex + 1];
};

const setContextFromURL = (pathname) => {
  const context = getContextFromURL(pathname);
  if (!process.env.ENTANDO_VIRTUAL_CONTEXTS) return deleteEntandoVirtualContextFromCookies();
  const virtualContexts = process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return setEntandoVirtualContextInCookies(context);
  // #$$$ root context => return setEntandoVirtualContextInCookies('ROOT');
  return setEntandoVirtualContextInCookies('');
};


const ContextProvider = ({ children }) => {
  React.useEffect(() => {
    if (window.location.pathname) {
      setContextFromURL(window.location.pathname);
    }

    return () => {
      deleteEntandoVirtualContextFromCookies();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const getBaseUrlWithVirtualContext = (baseUrl) => {
  const virtualContext = getEntandoVirtualContextFromCookies();
  return virtualContext ? `${baseUrl}/${virtualContext}` : baseUrl;
};

export { ContextProvider, getBaseUrlWithVirtualContext, getContextFromURL };
