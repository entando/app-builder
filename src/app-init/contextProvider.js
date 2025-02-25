// import { useLocation } from 'react-router-dom';
import { setCookie, ENTANDO_VIRTUAL_CONTEXT, deleteCookie } from 'helpers/cookies';
import React from 'react';

const setContextFromURL = (pathname) => {
  const pathFragments = pathname.split('/');
  const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
  const context = pathFragments[publicUrlIndex + 1];
  // const appBuilderIndex = process.env.PUBLIC_URL.split('/').findIndex(el => el === 'app-builder');
  // const context = process.env.PUBLIC_URL.split('/')[appBuilderIndex + 1];
  // console.log(process.env.PUBLIC_URL)
  // console.log(process.env.PUBLIC_URL.split('/'))
  // console.log('context', context);
  if (!process.env.ENTANDO_VIRTUAL_CONTEXTS) return deleteCookie(ENTANDO_VIRTUAL_CONTEXT);
  const virtualContexts = process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',');
  if (virtualContexts.includes(context)) {
    console.log('process.env', process.env);
    // process.env = `${process.env.DOMAIN}/${context}`;
    return setCookie(ENTANDO_VIRTUAL_CONTEXT, context);
  }

  // #$$$ root context => return setCookie(ENTANDO_VIRTUAL_CONTEXT, '.root');
  return setCookie(ENTANDO_VIRTUAL_CONTEXT, '.root');
};


const ContextProvider = ({ children }) => {
  React.useEffect(() => {
    if (window.location.pathname) {
      setContextFromURL(window.location.pathname);
    }

    return () => {
      deleteCookie(ENTANDO_VIRTUAL_CONTEXT);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};


// eslint-disable-next-line import/prefer-default-export
export { ContextProvider };
