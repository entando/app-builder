import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'registerServiceWorker';

// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import 'app-init/router';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import AppContainer from 'ui/app/AppContainer';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import 'frontend-common-components/index.css';
import 'sass/index.css';


// exporting for tests
export default ReactDOM.render(
  <Provider store={store}>
    <IntlProviderContainer>
      <AppContainer />
    </IntlProviderContainer>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
