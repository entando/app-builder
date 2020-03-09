import { get } from 'lodash';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';

const keycloakConfig = get(window, 'env.KEYCLOAK_JSON', process.env.KEYCLOAK_JSON);
const keycloak = new Keycloak(keycloakConfig);
keycloak.enabled = true;
keycloak.toRefreshToken = false;
keycloak.setToRefreshToken = (val) => {
  keycloak.toRefreshToken = val;
};

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });

export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    const { idTokenParsed: { preferred_username: username }, token } = keycloak;
    switch (event) {
      case 'onAuthSuccess':
        dispatch(loginUser(username, token));
        break;
      case 'onAuthRefreshSuccess':
        keycloak.setToRefreshToken(true);
        dispatch(loginUser(username, token));
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
