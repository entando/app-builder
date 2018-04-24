import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UserManagement from 'ui/dashboard/UserManagement';
import { ROUTE_USER_ADD } from 'app-init/router';
import { Link } from '@entando/router';

const component = shallow(<UserManagement onWillMount={() => {}} users={2} groups={3} />);


describe('UserManagement', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify it is a Card', () => {
    const element = component.find('Card');
    expect(element).toHaveLength(1);
  });

  it('verify it contains a button', () => {
    const element = component.find('Button');
    expect(element).toHaveLength(1);
    const props = element.props();
    expect(props).toHaveProperty('route', ROUTE_USER_ADD);
    expect(props).toHaveProperty('componentClass', Link);
  });
});
