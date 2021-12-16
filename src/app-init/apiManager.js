import React from 'react';
import PropTypes from 'prop-types';
import { ApiProvider } from '@entando/apimanager';
import {
  fetchPermissions,
  fetchLoggedUserPermissions,
  clearLoggedUserPermissions,
} from 'state/permissions/actions';
import { clearAppTourProgress } from 'state/app-tour/actions';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { history, ROUTE_DASHBOARD, ROUTE_HOME } from 'app-init/router';
import pluginsArray from 'entando-plugins';
import withAuth from 'auth/withAuth';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const ApiManager = ({
  auth,
  intl,
  store,
  children,
}) => {
  const logout = (status) => {
    try {
      store.dispatch(clearLoggedUserPermissions());
      store.dispatch(clearAppTourProgress());
      auth.logout(status);
    } catch (err) {
      // can occur when keycloak is still loading
    }
  };

  const goHome = (opts) => {
    if (auth.enabled && auth.toRefreshToken) {
      auth.setToRefreshToken(false);
    } else {
      const { redirectUri, pathname } = opts;
      store.dispatch(fetchPermissions())
        .then(() => store.dispatch(fetchLoggedUserPermissions()));
      if (redirectUri) {
        window.location.href = redirectUri;
        return;
      }
      const route = pathname ? pathname.replace(process.env.PUBLIC_URL, '') : null;
      const goto = auth.enabled && route && route !== ROUTE_HOME
        ? route
        : ROUTE_DASHBOARD;
      history.push(goto);
    }
  };

  const useMocks = process.env.USE_MOCKS;

  if (useMocks) {
    const msgs = defineMessages({
      usingMocks: {
        id: 'app.usingMocks',
        defaultMessage: 'Using Mocks',
      },
    });
    store.dispatch(addToast(
      intl.formatMessage(msgs.usingMocks),
      TOAST_WARNING,
    ));
  }

  const { DOMAIN } = getRuntimeEnv();

  return (
    <ApiProvider
      onLogout={logout}
      onLogin={goHome}
      store={store}
      domain={DOMAIN}
      useMocks={useMocks}
      plugins={pluginsArray}
    >
      {children}
    </ApiProvider>
  );
};

ApiManager.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    logout: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    toRefreshToken: PropTypes.bool,
    setToRefreshToken: PropTypes.func.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withAuth(injectIntl(ApiManager));
