import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import CreateFolderPage from 'ui/file-browser/add/CreateFolderPage';

describe('CreateFolderPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<CreateFolderPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('has the FileBreadcrumbContainer Component', () => {
    expect(component.find('.CreateFolderPage__fileBreadcrumbContainer')).toHaveLength(1);
  });
  it('has the FileButtonsGroupContainer Component', () => {
    expect(component.find('.CreateFolderPage__fileButtonsGroupContainer')).toHaveLength(1);
  });
  it('has the CreateFolderFormContainer Component', () => {
    expect(component.find('.CreateFolderPage__createFolderFormContainer')).toHaveLength(1);
  });
});
