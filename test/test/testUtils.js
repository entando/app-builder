import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider as StateProvider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rootReducer from 'state/rootReducer';
import { createMockHistory } from 'test/legacyTestUtils';

import enTranslations from 'locales/en';

const { locale: enLocale, messages: enMessages } = enTranslations;

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

export const createMockStore = (state = {}) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const defAuths = {
    api: { useMocks: true },
    currentUser: { username: 'a', token: 'b' },
  };
  const store = mockStore({ ...defAuths, ...state });
  return store;
};

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

export const renderWithRedux = (
  component,
  { initialState, reducer = rootReducer } = {},
) => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  return ({
    ...render(<StateProvider store={store}>{component}</StateProvider>),
    store,
  });
};

export const renderWithRouterProvider = (ui, history = createMockHistory()) => (
  <Router history={history}>{ui}</Router>
);

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
