import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { formattedText } from '@entando/utils';
import { history, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';
import withAuth from 'auth/withAuth';

class ApiManager extends Component {
  constructor(props) {
    super(props);
    this.initApiManager();
  }

  initApiManager() {
    const { store, auth } = this.props;
    const logout = () => auth.logout();
    const goHome = () => {
      if (!auth.toRefreshToken) {
        history.push(ROUTE_DASHBOARD);
      } else {
        auth.toRefreshToken = false;
      }
    };
    config(store, logout, goHome);
    store.dispatch(setApi({
      domain: (window && window.env && window.env.REACT_APP_DOMAIN) || process.env.DOMAIN,
      useMocks: process.env.USE_MOCKS,
    }));

    if (useMocks(store.getState())) {
      store.dispatch(addToast(
        formattedText('app.usingMocks'),
        TOAST_WARNING,
      ));
    }

    if (pluginsArray && pluginsArray.length) {
      pluginsArray.forEach((plugin) => {
        if (plugin.apiManagerConfig) {
          plugin.apiManagerConfig(store, logout, goHome);
        }
      });
    }
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

ApiManager.propTypes = {
  store: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withAuth(ApiManager);
