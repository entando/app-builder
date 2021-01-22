import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import registerServiceWorker from 'registerServiceWorker';
import { createServer, Response } from 'miragejs';

// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import { history } from 'app-init/router';
import 'app-init/locale';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import AuthProvider from 'auth/AuthProvider';
import ApiManager from 'app-init/apiManager';

import AppContainer from 'ui/app/AppContainer';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/dialog/dialog.css';
import '@entando/menu/dist/css/index.css';
import '@entando/pages/dist/css/index.css';
import '@entando/pagetreeselector/dist/css/index.css';

import 'index.scss';

// exporting for tests
export default ReactDOM.render(
  <Provider store={store}>
    <AuthProvider store={store}>
      <IntlProviderContainer>
        <ApiManager store={store}>
          <Router history={history}>
            <AppContainer />
          </Router>
        </ApiManager>
      </IntlProviderContainer>
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

if (window.Cypress) {
  // If your app makes requests to domains other than / (the current domain), add them
  // here so that they are also proxied from your app to the handleFromCypress function.
  // For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
  const otherDomains = ['http://localhost:8081'];
  const methods = ['get', 'put', 'patch', 'post', 'delete'];

  createServer({
    environment: 'test',
    routes() {
      // eslint-disable-next-line no-restricted-syntax
      for (const domain of ['/' , ...otherDomains]) {
        // eslint-disable-next-line no-restricted-syntax
        for (const method of methods) {
          this[method](`${domain}*`, async (schema, request) => {
            const [status, headers, body] = await window.handleFromCypress(request);
            return new Response(status, headers, body);
          });
        }
      }

      // If your central server has any calls to passthrough(), you'll need to duplicate them here
      // this.passthrough('https://analytics.google.com')
      this.passthrough('http://localhost:3000/*');
      this.passthrough('http://localhost:8081/*');
    },
  });
}
