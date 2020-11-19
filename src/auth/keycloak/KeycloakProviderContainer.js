import { get } from 'lodash';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';
import { fetchLoggedUserPermissions } from 'state/permissions/actions';
import { clearAppTourProgress } from 'state/app-tour/actions';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const { KEYCLOAK_JSON } = getRuntimeEnv();
const keycloak = new Keycloak(KEYCLOAK_JSON);
keycloak.enabled = true;
keycloak.toRefreshToken = false;
keycloak.setToRefreshToken = (val) => {
  keycloak.toRefreshToken = val;
};

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });

export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    if (!keycloak) {
      return;
    }
    const username = get(keycloak, 'idTokenParsed.preferred_username');
    const { token } = keycloak;
    switch (event) {
      case 'onAuthSuccess':
        dispatch(clearAppTourProgress());
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
      default:
        break;
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeycloakProvider);
