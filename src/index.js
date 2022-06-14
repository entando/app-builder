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
import MfeDownloadManager from 'app-init/MfeDownloadManager';

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

// init namespace for the shell
if (!window.entando) window.entando = {};

if (process.env.USE_MFE_MOCKS) {
  import('./services/mocking/init').then(({ initMockingService }) => {
    initMockingService();
  });
}

// exporting for tests
export default ReactDOM.render(
  <Provider store={store}>
    <AuthProvider store={store}>
      <IntlProviderContainer>
        <ApiManager store={store}>
          <MfeDownloadManager>
            <Router history={history}>
              <AppContainer />
            </Router>
          </MfeDownloadManager>
        </ApiManager>
      </IntlProviderContainer>
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
