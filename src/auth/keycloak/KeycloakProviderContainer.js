import React from 'react';
import { get } from 'lodash';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';
import { fetchLoggedUserPermissions } from 'state/permissions/actions';
import getRuntimeEnv from 'helpers/getRuntimeEnv';
import RowSpinner from 'ui/pages/common/RowSpinner';

const { KEYCLOAK_JSON } = getRuntimeEnv();
export const keycloak = new Keycloak(KEYCLOAK_JSON);
keycloak.enabled = true;
keycloak.toRefreshToken = false;
keycloak.setToRefreshToken = (val) => {
  keycloak.toRefreshToken = val;
};

const Loading = <div className="shell-preload"><RowSpinner loading /></div>;

export const mapStateToProps = () => ({ authClient: keycloak, initConfig: { onLoad: 'login-required' }, LoadingComponent: Loading });

export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    if (!keycloak) {
      return;
    }
    const username = get(keycloak, 'idTokenParsed.preferred_username');
    const { token } = keycloak;

    switch (event) {
      case 'onAuthSuccess':
        dispatch(loginUser(username, token));
        break;
      case 'onAuthRefreshSuccess':
        keycloak.setToRefreshToken(true);
        dispatch(loginUser(username, token));
        dispatch(fetchLoggedUserPermissions());

        break;
      case 'onAuthRefreshError':
        keycloak.logout();
        break;
      case 'onReady':
        if (!username || !token) {
          keycloak.login();
        } else {
          dispatch(loginUser(username, token));
        }
        break;
      default:
        keycloak.login();
        break;
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactKeycloakProvider);
