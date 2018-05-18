
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ProfileTypeStatusIcon from 'ui/profile-types/common/ProfileTypeStatusIcon';

describe('ProfileTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProfileTypeStatusIcon status="ok" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = ko, has class ProfileTypeStatusIcon--ok', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="ok" />);
    expect(draftComponent.hasClass('ProfileTypeStatusIcon--ok')).toBe(true);
  });
  it('if status = ok, has class ProfileTypeStatusIcon--ko', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="ko" />);
    expect(draftComponent.hasClass('ProfileTypeStatusIcon--ko')).toBe(true);
  });
  it('if status = wip, has class ProfileTypeStatusIcon--wip', () => {
    const draftComponent = shallow(<ProfileTypeStatusIcon status="wip" />);
    expect(draftComponent.hasClass('ProfileTypeStatusIcon--wip')).toBe(true);
  });
});
