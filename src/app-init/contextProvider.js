// import { useLocation } from 'react-router-dom';
import { setCookie, ENTANDO_VIRTUAL_CONTEXTS, deleteCookie } from 'helpers/cookies';
import React from 'react';

const setContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];
  if (!process.env.ENTANDO_VIRTUAL_CONTEXTS) return deleteCookie(ENTANDO_VIRTUAL_CONTEXTS);
  const virtualContexts = process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) return setCookie(ENTANDO_VIRTUAL_CONTEXTS, context);
  return setCookie(ENTANDO_VIRTUAL_CONTEXTS, '');
};


const ContextProvider = ({ children }) => {
  React.useEffect(() => {
    if (window.location.pathname) {
      setContextFromURL(window.location.pathname);
    }

    return () => {
      deleteCookie(ENTANDO_VIRTUAL_CONTEXTS);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};


// eslint-disable-next-line import/prefer-default-export
export { ContextProvider };
