import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ListFilesPage from 'ui/file-browser/list/ListFilesPage';

describe('ListFilesPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListFilesPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('has the FileBreadcrumbContainer Component', () => {
    expect(component.find('.ListFilesPage__fileBreadcrumbContainer')).toHaveLength(1);
  });
  it('has the FileButtonsGroupContainer Component', () => {
    expect(component.find('.ListFilesPage__fileButtonsGroupContainer')).toHaveLength(1);
  });
  it('has the ListTableContainer Component', () => {
    expect(component.find('.ListFilesPage__fileListTableContainer')).toHaveLength(1);
  });
});
