import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import CategoryFolderIcon from 'ui/categories/common/CategoryFolderIcon';

describe('CategoryFolderIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<CategoryFolderIcon />);
    expect(component.exists()).toEqual(true);
  });

  it('shows an empty folder icon if empty === true ', () => {
    const component = shallow(<CategoryFolderIcon empty />);
    expect(component.hasClass('fa fa-folder-o')).toEqual(true);
  });

  it('shows a full folder icon if empty === false ', () => {
    const component = shallow(<CategoryFolderIcon />);
    expect(component.hasClass('fa fa-folder')).toEqual(true);
  });
});
