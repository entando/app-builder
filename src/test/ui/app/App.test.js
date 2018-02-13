
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import App from 'ui/app/App';
import DashboardPage from 'ui/dashboard-page/DashboardPage';


const DEFAULT_MOCK = <h1>NOT FOUND</h1>; // NotFoundPage

it('renders without crashing', () => {
  const component = shallow(<App route="home" />);
  expect(component.exists()).toEqual(true);
});

it('route to dashboard', () => {
  const component = shallow(<App route="dashboard" />);
  expect(component.contains(<DashboardPage />)).toEqual(true);
});

it('default route', () => {
  const component = shallow(<App route="test" />);
  expect(component.contains(DEFAULT_MOCK)).toEqual(true);
});
