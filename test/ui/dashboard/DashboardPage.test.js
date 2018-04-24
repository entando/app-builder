import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DashboardPage from 'ui/dashboard/DashboardPage';

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    const component = shallow(<DashboardPage />);
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage', () => {
    const component = shallow(<DashboardPage />);
    const InternalPage = component.find('InternalPage');
    expect(InternalPage).toHaveLength(1);
    expect(InternalPage.hasClass('DashboardPage')).toEqual(true);
  });

  it('verify if exist UserManagement', () => {
    const component = shallow(<DashboardPage />);
    expect(component.find('UserManagement')).toHaveLength(1);
  });
});
