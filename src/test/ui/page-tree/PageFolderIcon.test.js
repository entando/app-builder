
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageFolderIcon from 'ui/page-tree/PageFolderIcon';

describe('ui/page-tree/PageFolderIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageFolderIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an empty folder icon if empty === true ', () => {
    const component = shallow(<PageFolderIcon empty />);
    expect(component.hasClass('fa fa-folder-o')).toEqual(true);
  });

  it('shows a full folder icon if empty === false ', () => {
    const component = shallow(<PageFolderIcon />);
    expect(component.hasClass('fa fa-folder')).toEqual(true);
  });
});
