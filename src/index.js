import React from 'react';
import ReactDOM from 'react-dom';

// import App from 'ui/app/components/App';
import registerServiceWorker from 'registerServiceWorker';
import { LoginPage, LoginForm } from 'frontend-common-components';

// state manager (Redux)
import { Provider } from 'react-redux';
import store from 'state/store';

import 'app-init/router';

import { IntlProvider } from 'react-intl';
import i18nConfig from 'app-init/locale';

import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import 'frontend-common-components/index.css';
import 'sass/index.css';


// exporting for tests
export default ReactDOM.render(
  <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
    <Provider store={store}>
      <LoginPage>
        <LoginForm />
      </LoginPage>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
