import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import { shallow } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import { IntlProvider } from 'react-intl';

const enMessages = require('../../src/locales/en');

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

export const mockRenderWithIntl = ui => <IntlProviderContainer>{ui}</IntlProviderContainer>;

export const shallowWithIntl = node => shallow(node, {
  wrappingComponent: IntlProvider,
  wrappingComponentProps: {
    locale: 'en',
    defaultLocale: 'en',
    messages: enMessages,
  },
});
