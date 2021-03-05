import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider, intlShape } from 'react-intl';
import { config } from '@entando/apimanager';
import { shallow, mount, configure } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import { createMemoryHistory } from 'history';
import { Router, MemoryRouter, Route } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import enTranslations from 'locales/en';
import { render, screen, within } from '@testing-library/react';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { DDProvider } from '@entando/ddtable';

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

// React Testing Library utils

export const renderWithWrapper = (ui, {
  wrapperComp: WrapperComp, wrapperProps, ...renderOptions
} = {}) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <WrapperComp {...wrapperProps}>
      {children}
    </WrapperComp>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

const { locale: enLocale, messages: enMessages } = enTranslations;

export const renderWithIntl = (ui, {
  locale = enLocale, messages = enMessages, ...renderOptions
} = {}) => renderWithWrapper(ui, {
  wrapperComp: IntlProvider,
  wrapperProps: { locale, messages },
  ...renderOptions,
});

export const renderWithRouter = (ui, {
  initialRoute = '/', path = '/', ...renderOptions
} = {}) => renderWithWrapper(
  (
    <Route path={path}>{ui}</Route>
  ), {
    wrapperComp: MemoryRouter,
    wrapperProps: { initialEntries: [initialRoute] },
    ...renderOptions,
  },
);

export const renderWithState = (ui, {
  state, store = createMockStore(state), ...renderOptions
} = {}) => renderWithWrapper(ui, {
  wrapperComp: StateProvider,
  wrapperProps: { store },
  ...renderOptions,
});

export const renderWithIntlAndRouter = (ui, {
  locale = enLocale, messages = enMessages, initialRoute = '/', path = '/', ...renderOptions
} = {}) => renderWithRouter(
  <IntlProvider locale={locale} messages={messages}>{ui}</IntlProvider>,
  { initialRoute, path, ...renderOptions },
);

export const renderWithIntlAndState = (ui, {
  locale = enLocale, messages = enMessages, state, store = createMockStore(state), ...renderOptions
} = {}) => renderWithState(
  <IntlProvider locale={locale} messages={messages}>{ui}</IntlProvider>,
  { state, store, ...renderOptions },
);

export const renderWithIntlRouterState = (ui, {
  locale = enLocale, messages = enMessages, initialRoute = '/', path = '/',
  state, store = createMockStore(state), ...renderOptions
} = {}) => renderWithState(
  <MemoryRouter initialEntries={[initialRoute]}>
    <IntlProvider locale={locale} messages={messages}>
      <Route path={path}>{ui}</Route>
    </IntlProvider>
  </MemoryRouter>,
  { state, store, ...renderOptions },
);

/**
 * This requires the `ui` to have a form with an `aria-label` attribute defined.
 */
export const setupForm = (formName, formValues, renderWithStateFunc, ui) => {
  const state = {
    form: {
      [formName]: {
        values: formValues,
      },
    },
  };
  const store = createStore(combineReducers({
    form: formReducer,
  }), state);
  const utils = renderWithStateFunc(ui, { store });
  const formView = within(screen.getByRole('form'));
  return { formView, formValues, ...utils };
};
