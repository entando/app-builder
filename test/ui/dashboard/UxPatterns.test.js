import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UxPatterns from 'ui/dashboard/UxPatterns';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import { Link } from 'react-router-dom';

const component = shallow(<UxPatterns onWillMount={() => {}} widgets={2} pageTemplates={3} />);


describe('UserManagement', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a Card', () => {
    const element = component.find('Card');
    expect(element).toHaveLength(1);
  });

  it('verify it contains a button', () => {
    const element = component.find('Button');
    expect(element).toHaveLength(1);
    const props = element.props();
    expect(props).toHaveProperty('to', ROUTE_WIDGET_ADD);
    expect(props).toHaveProperty('componentClass', Link);
  });
});
