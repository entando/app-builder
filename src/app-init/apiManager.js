import React from 'react';
import PropTypes from 'prop-types';
import { ApiProvider } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { history, ROUTE_DASHBOARD, ROUTE_HOME } from 'app-init/router';
import pluginsArray from 'entando-plugins';
import withAuth from 'auth/withAuth';

const ApiManager = ({
  auth,
  intl,
  store,
  children,
}) => {
  const logout = (status) => {
    auth.logout(status);
  };

  const goHome = (opts) => {
    if (auth.enabled && auth.toRefreshToken) {
      auth.setToRefreshToken(false);
    } else {
      const { redirectUri, pathname } = opts;
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

  return (
    <ApiProvider
      onLogout={logout}
      onLogin={goHome}
      store={store}
      domain={(window && window.env && window.env.REACT_APP_DOMAIN) || process.env.DOMAIN}
      useMocks={useMocks}
      plugins={pluginsArray}
    >
      {children}
    </ApiProvider>
  );
};

ApiManager.propTypes = {
  store: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withAuth(injectIntl(ApiManager));
