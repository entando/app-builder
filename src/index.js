import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import registerServiceWorker from 'registerServiceWorker';

// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import { history } from 'app-init/router';
import 'app-init/locale';
import 'app-init/apiManager';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import AppContainer from 'ui/app/AppContainer';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import 'codemirror/lib/codemirror.css';
import '@entando/menu/dist/css/index.css';
import '@entando/pages/dist/css/index.css';
import KeycloakProviderContainer from 'ui/app/KeycloakProviderContainer';

import 'index.scss';

// exporting for tests
export default ReactDOM.render(
  <Provider store={store}>
    <IntlProviderContainer>
      <KeycloakProviderContainer>
        <Router history={history}>
          <AppContainer />
        </Router>
      </KeycloakProviderContainer>
    </IntlProviderContainer>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
