import React from 'react';
import { compose } from 'redux';
import { withKeycloak as withKeycloakRaw } from 'react-keycloak';
import withDefaultAuth from 'auth/default/withDefaultAuth';
import useKeycloak from 'auth/useKeycloak';

const withKeycloakAdapter = WrappedComponent => (props) => {
  // eslint-disable-next-line react/prop-types
  const { keycloak, keycloakInitialized, ...otherProps } = props;
  return (
    <WrappedComponent
      {...otherProps}
      isReady={keycloakInitialized}
      auth={keycloak}
    />
  );
};

const withAuth = useKeycloak
  ? compose(
    withKeycloakRaw,
    withKeycloakAdapter,
  )
  : withDefaultAuth;

export default withAuth;
