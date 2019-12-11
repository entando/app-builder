import React from 'react';
import PropTypes from 'prop-types';
import KeycloakProviderContainer from 'auth/keycloak/KeycloakProviderContainer';
import DefaultAuthProvider from 'auth/default/DefaultAuthProvider';
import useKeycloak from 'auth/useKeycloak';

const Provider = useKeycloak
  ? KeycloakProviderContainer
  : DefaultAuthProvider;

const AuthProvider = ({ children }) => <Provider>{children}</Provider>;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
