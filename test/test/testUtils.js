import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider, intlShape } from 'react-intl';
import { config } from '@entando/apimanager';
import { shallow, mount, configure } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import enTranslations from 'locales/en';
import { DDProvider } from '@entando/ddtable';
import { render as rtlRender } from '@testing-library/react';

export const configEnzymeAdapter = () => {
  configure({ adapter: new Adapter() });
};

export const errorResponse = (...messages) => ({
  errors: messages.map((message, code) => ({ code, message })),
});

export const mockApi = ({
  errors, payload, metaData, codeStatus = 500,
}) => {
  const statusCode = (errors === true) ||
    (Array.isArray(errors) && errors.length) ? codeStatus : 200;
  const response = {
    errors: errors === true ? [{ code: 1, message: 'Error!' }] : errors || [],
    payload: payload || {},
    metaData: metaData || [],
  };
  return () => new Promise(resolve => (
    resolve(new Response(
      new Blob(
        [
          JSON.stringify(
            response,
            null,
            2,
          ),
        ],
        { type: 'application/json' },
      ),
      { status: statusCode },
    ))
  ));
};

export const mockThunk = arg => () => () => new Promise(r => r(arg));

export const createMockHistory = () => createMemoryHistory({ initialEntries: ['/'] });

export const runValidators = (arr, value, allValues) =>
  arr.reduce((acc, func) => (acc || func(value, allValues)), undefined);

export const createMockStore = (state = {}) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const defAuths = {
    api: { useMocks: true },
    currentUser: { username: 'a', token: 'b' },
  };
  const store = mockStore({ ...defAuths, ...state });
  config(store);
  return store;
};

export const mockRenderWithStore = (ui, state = {}) => {
  const STORE = createMockStore(state);
  return <StateProvider store={STORE}>{ui}</StateProvider>;
};

export const mockRenderWithIntlAndStore = (ui, state = {}) => {
  const STATE = { ...state, locale: 'en' };
  return mockRenderWithStore(<IntlProviderContainer>{ui}</IntlProviderContainer>, STATE);
};

export const mockRenderWithRouter = (ui, history = createMockHistory()) => (
  <Router history={history}>{ui}</Router>
);

export const mockRenderWithIntlDDStoreRouter = (ui, state = {}) => {
  const STATE = { ...state, locale: 'en' };
  const intlStore = mockRenderWithIntlAndStore(ui, STATE);
  return mockRenderWithRouter(<DDProvider>{intlStore}</DDProvider>);
};

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider(
  { locale: enTranslations.locale, messages: enTranslations.messages },
  {},
);
const { intl } = intlProvider.getChildContext();

function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context, ...additionalOptions } = {}) {
  return shallow(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
      ...additionalOptions,
    },
  );
}

export function mountWithIntl(node, { context, childContextTypes, ...additionalOptions } = {}) {
  return mount(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
      ...additionalOptions,
    },
  );
}

export const renderWithIntl = (ui, { locale = 'en', ...renderOptions } = {}) => {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <IntlProvider locale={locale} messages={enTranslations.messages}>
        {children}
      </IntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export const mockIntl = {
  formatMessage: () => {},
  defineMessages: () => {},
  intlShape: () => {},
  formatDate: () => {},
  formatTime: () => {},
  formatRelative: () => {},
  formatNumber: () => {},
  formatPlural: () => {},
  formatHTMLMessage: () => {},
  now: () => {},
};
