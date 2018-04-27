import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import Integrations from 'ui/dashboard/Integrations';

const component = shallow(<Integrations onWillMount={() => {}} plugins={2} apis={3} />);

describe('UserManagement', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a Card', () => {
    const element = component.find('Card');
    expect(element).toHaveLength(1);
  });
});
