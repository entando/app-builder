import React from 'react';
import ReactDOM from 'react-dom';

import App from 'ui/app/components/App';
import registerServiceWorker from 'registerServiceWorker';


// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import { IntlProvider } from 'react-intl';
import i18nConfig from 'app-init/locale';


import 'sass/index.css';


// exporting for tests
export default ReactDOM.render(
  <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
