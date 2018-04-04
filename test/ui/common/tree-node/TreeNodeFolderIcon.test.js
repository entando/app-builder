import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';

describe('TreeNodeFolderIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<TreeNodeFolderIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an empty folder icon if empty === true ', () => {
    const component = shallow(<TreeNodeFolderIcon empty />);
    expect(component.hasClass('fa fa-folder-o')).toEqual(true);
  });

  it('shows a full folder icon if empty === false ', () => {
    const component = shallow(<TreeNodeFolderIcon />);
    expect(component.hasClass('fa fa-folder')).toEqual(true);
  });
});
