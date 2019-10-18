import React from 'react';
import { withKeycloak as withKeycloakRaw } from 'react-keycloak';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak(process.env.KEYCLOAK_JSON);
export const keycloakEnabled = !process.env.USE_MOCKS && process.env.KEYCLOAK_ENABLED;
export const keycloakLogout = () => keycloak.logout();
keycloak.enabled = keycloakEnabled;

const keycloakDisabled = { enabled: false, authenticated: false };

const withKeycloakDisabled = WrappedComponent => (
  props => (<WrappedComponent
    {...props}
    keycloak={keycloakDisabled}
  />));

export const withKeycloak = component => (keycloakEnabled
  ? withKeycloakRaw(component)
  : withKeycloakDisabled(component));
