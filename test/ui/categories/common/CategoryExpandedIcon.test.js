import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import CategoryExpandedIcon from 'ui/categories/common/CategoryExpandedIcon';

describe('CategoryExpandedIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<CategoryExpandedIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an angle right icon if expanded === false ', () => {
    const component = shallow(<CategoryExpandedIcon />);
    expect(component.find('.fa.fa-angle-right').exists()).toEqual(true);
  });

  it('shows an angle down icon if expanded === true ', () => {
    const component = shallow(<CategoryExpandedIcon expanded />);
    expect(component.find('.fa.fa-angle-down').exists()).toEqual(true);
  });
});
