
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataTypeStatusIcon from 'ui/data-types/common/DataTypeStatusIcon';

describe('DataTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<DataTypeStatusIcon status="ok" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = ko, has class DataTypeStatusIcon--ok', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="ok" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--ok')).toBe(true);
  });
  it('if status = ok, has class DataTypeStatusIcon--ko', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="ko" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--ko')).toBe(true);
  });
  it('if status = wip, has class DataTypeStatusIcon--wip', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="wip" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--wip')).toBe(true);
  });
});
