import React from 'react';
import PropTypes from 'prop-types';
import KeycloakProviderContainer from 'auth/keycloak/KeycloakProviderContainer';
import DefaultAuthProvider from 'auth/default/DefaultAuthProvider';
import keycloakEnabled from 'auth/keycloakEnabled';

const Provider = keycloakEnabled
  ? KeycloakProviderContainer
  : DefaultAuthProvider;

const AuthProvider = ({ children }) => <Provider>{children}</Provider>;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
