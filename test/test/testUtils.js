import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import { shallow, mount, configure } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import { IntlProvider } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';

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

export const mockRenderWithIntl = (ui, state = {}) => {
  const STATE = { ...state, locale: 'en' };
  return mockRenderWithStore(<IntlProviderContainer>{ui}</IntlProviderContainer>, STATE);
};

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../../src/locales/en'); // en.json

const defaultLocale = 'en';
const locale = defaultLocale;

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
    },
  });
}

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
    },
  });
}
