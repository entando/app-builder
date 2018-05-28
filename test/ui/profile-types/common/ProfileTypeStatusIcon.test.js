
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ProfileTypeStatusIcon from 'ui/profile-types/common/ProfileTypeStatusIcon';

describe('ProfileTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProfileTypeStatusIcon status="0" />);
    expect(component.exists()).toEqual(true);
  });

  it('ok icon', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="0" />);
    expect(draftComponent.props()).toHaveProperty('name', 'check');
  });
  it('ko icon', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="2" />);
    expect(draftComponent.props()).toHaveProperty('name', 'exclamation');
  });
  it('wip icon', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="1" />);
    expect(draftComponent.props()).toHaveProperty('name', 'spinner');
  });
});
