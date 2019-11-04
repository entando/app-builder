import React, { Fragment } from 'react';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser, setUser } from '@entando/apimanager';
import { keycloak, keycloakEnabled } from 'ui/app/Keycloak';

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });
export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    const { idTokenParsed: { preferred_username: username }, token } = keycloak;

    switch (event) {
      case 'onAuthSuccess':
        dispatch(loginUser(username, token));
        break;
      case 'onAuthRefreshSuccess':
        dispatch(setUser({
          username,
          token,
        }));
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        break;
      case 'onTokenExpired':
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
