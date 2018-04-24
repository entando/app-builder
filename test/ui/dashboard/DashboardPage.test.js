import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DashboardPage from 'ui/dashboard/DashboardPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import InternalPage from 'ui/internal-page/InternalPage';

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    const component = shallow(<DashboardPage />);
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage', () => {
    const component = shallow(<DashboardPage />);
    expect(component.type()).toBe(InternalPage);
    expect(component.hasClass('DashboardPage')).toEqual(true);
  });

  it('verify if exist UserManagement', () => {
    const component = shallow(<DashboardPage />);
    expect(component.find(UserManagementContainer)).toHaveLength(1);
  });
});
