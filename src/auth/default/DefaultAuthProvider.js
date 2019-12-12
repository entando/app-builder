import React from 'react';
import PropTypes from 'prop-types';
import DefaultAuthContext from 'auth/default/DefaultAuthContext';
import { history, ROUTE_HOME } from 'app-init/router';

const DefaultAuthProvider = ({ children }) => {
  const auth = {
    enabled: false,
    authenticated: false,
    logout: () => history.push(ROUTE_HOME),
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
