
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataTypeStatusIcon from 'ui/data-types/common/DataTypeStatusIcon';

describe('DataTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<DataTypeStatusIcon status="0" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = 0, has class DataTypeStatusIcon--check', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="0" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--check')).toBe(true);
  });
  it('if status = 2, has class DataTypeStatusIcon--exclamation', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="2" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--exclamation')).toBe(true);
  });
  it('if status = 1, has class DataTypeStatusIcon--spinner', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="1" />);
    expect(draftComponent.hasClass('DataTypeStatusIcon--spinner')).toBe(true);
  });
});
