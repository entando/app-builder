import React from 'react';

import 'test/enzyme-init';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

import AppContainer, { mapStateToProps } from 'ui/app/AppContainer';

const TEST_STATE = {
  router: { route: 'page' },
};

it('renders without crashing', () => {
  const store = createMockStore(TEST_STATE);
  const component = shallowWithStore(<AppContainer />, store);
  expect(component.exists()).toEqual(true);
});

it('maps route property with state.router.route', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ route: 'page' });
});
