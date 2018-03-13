
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UserStatus from 'ui/users/common/UserStatus';

describe('DataTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<UserStatus status="active" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = active, has class UserStatus--active', () => {
    const activeComponent = shallow(<UserStatus status="active" />);
    expect(activeComponent.hasClass('UserStatus--active')).toBe(true);
  });
  it('if status = disabled, has class UserStatus--disabled', () => {
    const disabledComponent = shallow(<UserStatus status="disabled" />);
    expect(disabledComponent.hasClass('UserStatus--disabled')).toBe(true);
  });
});
