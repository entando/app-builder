import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'registerServiceWorker';

// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import 'app-init/router';
import 'app-init/locale';
import 'app-init/apiManager';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import AppContainer from 'ui/app/AppContainer';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import 'codemirror/lib/codemirror.css';

import 'frontend-common-components/index.css';
import 'index.scss';


// exporting for tests
export default ReactDOM.render(
  <Provider store={store}>
    <IntlProviderContainer>
      <DragDropContextProvider backend={HTML5Backend}>
        <AppContainer />
      </DragDropContextProvider>
    </IntlProviderContainer>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
