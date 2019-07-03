import React from 'react';
import { withKeycloak as withKeycloakRaw } from 'react-keycloak';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak(process.env.KEYCLOAK_JSON);
export const keycloakEnabled = process.env.KEYCLOAK_ENABLED;
export const keycloakLogout = () => keycloak.logout();

const keycloakDisabled = { enabled: false, authenticated: false };

function withKeycloakDisabled(Component) {
  return props => <Component keycloak={keycloakDisabled} {...props} />;
}

export const withKeycloak = component => (keycloakEnabled
  ? withKeycloakRaw(component)
  : withKeycloakDisabled(component));
