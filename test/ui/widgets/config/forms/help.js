import React from 'react';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { config } from '@entando/apimanager';
import { configure } from 'enzyme';
import { Provider as StateProvider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';
import { reduxForm } from 'redux-form';

export const configEnzymeAdapter = () => {
  configure({ adapter: new Adapter() });
};

export const mockApi = ({
  errors, payload, metaData, codeStatus = 500,
}) => {
  const statusCode = errors === true || (Array.isArray(errors) && errors.length) ? codeStatus : 200;
  const response = {
    errors: errors === true ? [{ code: 1, message: 'Error!' }] : errors || [],
    payload: payload || {},
    metaData: metaData || [],
  };
  return () => new Promise(resolve => resolve(new Response(new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' }), {
    status: statusCode,
  })));
};

export const createMockHistory = () => createMemoryHistory({ initialEntries: ['/'] });

export const mockRenderWithRouter = (ui, history = createMockHistory()) => (
  <Router history={history}>{ui}</Router>
);

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

export const findByTestId = (wrapper, testId) => wrapper.find(`[data-test-id="${testId}"]`);

export const addReduxForm = (def, formName = 'form') => reduxForm({ form: formName })(def);
