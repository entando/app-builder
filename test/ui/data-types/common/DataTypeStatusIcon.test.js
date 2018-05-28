
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataTypeStatusIcon from 'ui/data-types/common/DataTypeStatusIcon';

describe('DataTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<DataTypeStatusIcon status="0" />);
    expect(component.exists()).toEqual(true);
  });

  it('ok icon', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="0" />);
    expect(draftComponent.props()).toHaveProperty('name', 'check');
  });
  it('ko icon', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="2" />);
    expect(draftComponent.props()).toHaveProperty('name', 'exclamation');
  });
  it('wip icon', () => {
    const draftComponent = shallow(<DataTypeStatusIcon status="1" />);
    expect(draftComponent.props()).toHaveProperty('name', 'spinner');
  });
});
