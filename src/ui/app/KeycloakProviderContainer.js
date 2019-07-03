import React, { Fragment } from 'react';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '@entando/apimanager';
import { keycloak, keycloakEnabled } from 'ui/app/Keycloak';

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });
export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    switch (event) {
      case 'onAuthSuccess':
      case 'onAuthRefreshSuccess':
        dispatch(loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token));
        break;
      case 'onTokenExpired':
        dispatch(logoutUser());
        break;
      default:
        break;
    }
  },
});

const KeycloakProviderContainer = keycloakEnabled
  ? connect(mapStateToProps, mapDispatchToProps)(KeycloakProvider)
  // eslint-disable-next-line react/prop-types
  : props => <Fragment>{props.children}</Fragment>;

export default KeycloakProviderContainer;
