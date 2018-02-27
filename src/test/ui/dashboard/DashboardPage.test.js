import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DashboardPage from 'ui/dashboard/DashboardPage';
import InternalPage from 'ui/internal-page/InternalPage';


it('renders without crashing', () => {
  const component = shallow(<DashboardPage />);
  expect(component.exists()).toEqual(true);
});

it('verify if exist InternalPage', () => {
  const component = shallow(<DashboardPage />);
  expect(component.contains(<InternalPage className="DashboardPage" />)).toEqual(true);
});
