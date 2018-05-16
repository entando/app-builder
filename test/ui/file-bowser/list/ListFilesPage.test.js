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

  it('verify buttons', () => {
    expect(component.find('Button')).toHaveLength(3);
  });

  it('verify if button upload exist', () => {
    expect(component.find('.ListFilesPage__uploadFile')).toHaveLength(1);
  });

  it('verify if button create folder exist', () => {
    expect(component.find('.ListFilesPage__createFolder')).toHaveLength(1);
  });

  it('verify if button create text file exist', () => {
    expect(component.find('.ListFilesPage__createTextFile')).toHaveLength(1);
  });

  it('verify if FilesListTableContainer exist ', () => {
    expect(component.find('.ListFilesPage__fileListTableContainer').exists()).toBe(true);
  });

  it('verify if Breadcrumb exist ', () => {
    expect(component.find('.ListFilesPage__fileBreadcrumbContainer').exists()).toBe(true);
  });
});
