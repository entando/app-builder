import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';

describe('TreeNodeExpandedIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<TreeNodeExpandedIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an angle right icon if expanded === false ', () => {
    const component = shallow(<TreeNodeExpandedIcon />);
    expect(component.find('.fa.fa-angle-right').exists()).toEqual(true);
  });

  it('shows an angle down icon if expanded === true ', () => {
    const component = shallow(<TreeNodeExpandedIcon expanded />);
    expect(component.find('.fa.fa-angle-down').exists()).toEqual(true);
  });
});
