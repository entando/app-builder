import React from 'react';
import PropTypes from 'prop-types';
import DefaultAuthContext from 'auth/default/DefaultAuthContext';
import { history, ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';

const DefaultAuthProvider = ({ children }) => {
  const auth = {
    enabled: false,
    authenticated: false,
    logout: (status) => {
      let addredirect = '';
      if (status) {
        const exception = [ROUTE_HOME, ROUTE_DASHBOARD];
        const { pathname } = status;
        if (exception.indexOf(pathname) === -1) {
          addredirect = `?redirect_uri=${pathname}`;
        }
      }

      history.push(`${ROUTE_HOME}${addredirect}`);
    },
  };
  const authProps = {
    auth,
    authInitialized: true,
  };
  return (
    <DefaultAuthContext.Provider value={authProps}>
      {children}
    </DefaultAuthContext.Provider>
  );
};

DefaultAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultAuthProvider;
