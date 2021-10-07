import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as StateProvider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';
import { DDProvider } from '@entando/ddtable';
import { config } from '@entando/apimanager';
import { Router } from 'react-router-dom';
import { IntlProvider, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';

import enTranslations from 'locales/en';
import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

export const configEnzymeAdapter = () => {
  configure({ adapter: new Adapter() });
};

export const enzymeHelperFindByTestId = (wrapper, testId) => wrapper.find(`[data-test-id="${testId}"]`);

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

export const addReduxForm = (def, formName = 'form') => reduxForm({ form: formName })(def);
