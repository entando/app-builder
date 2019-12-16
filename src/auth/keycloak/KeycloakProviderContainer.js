import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';

const keycloak = new Keycloak(process.env.KEYCLOAK_JSON);
keycloak.enabled = true;

export const mapStateToProps = () => ({ keycloak, initConfig: { onLoad: 'login-required' } });

export const mapDispatchToProps = dispatch => ({
  onEvent: (event) => {
    const { idTokenParsed: { preferred_username: username }, token } = keycloak;
    switch (event) {
      case 'onAuthSuccess':
        dispatch(loginUser(username, token));
        break;
      case 'onAuthRefreshSuccess':
        keycloak.toRefreshToken = true;
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
