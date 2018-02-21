
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageExpandedIcon from 'ui/page-tree/PageExpandedIcon';

describe('ui/page-tree/PageExpandedIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageExpandedIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an angle right icon if expanded === false ', () => {
    const component = shallow(<PageExpandedIcon />);
    expect(component.find('.fa.fa-angle-right').exists()).toEqual(true);
  });

  it('shows an angle down icon if expanded === true ', () => {
    const component = shallow(<PageExpandedIcon expanded />);
    expect(component.find('.fa.fa-angle-down').exists()).toEqual(true);
  });
});
