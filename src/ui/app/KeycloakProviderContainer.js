import React, { Fragment } from 'react';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';
import { keycloak, keycloakEnabled } from 'ui/app/Keycloak';
import { updateUserToken } from 'state/login-form/actions';

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });
export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    const { idTokenParsed: { preferred_username: username }, token } = keycloak;

    switch (event) {
      case 'onAuthSuccess':
        dispatch(loginUser(username, token));
        break;
      case 'onAuthRefreshSuccess':
        dispatch(updateUserToken(username, token));
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
