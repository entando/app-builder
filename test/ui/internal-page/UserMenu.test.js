import React from 'react';
import { UserDropdown, LinkMenuItem } from '@entando/menu';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UserMenu from 'ui/internal-page/UserMenu';

const component = shallow(<UserMenu logout={() => {}} username="entando" />);


describe('UserMenu', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a UserDropdown', () => {
    expect(component.type()).toBe(UserDropdown);
  });

  it('verify it contains my profile and logout', () => {
    expect(component.find(LinkMenuItem).props()).toHaveProperty('id', 'my-profile');
    expect(component.find('Icon[name="sign-out"]')).toHaveLength(1);
  });
});
