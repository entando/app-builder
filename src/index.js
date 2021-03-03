import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import registerServiceWorker from 'registerServiceWorker';

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
import '@entando/datatable/dist/css/index.css';

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
