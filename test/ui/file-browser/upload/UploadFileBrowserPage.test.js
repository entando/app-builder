import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UploadFileBrowserPage from 'ui/file-browser/upload/UploadFileBrowserPage';
import UploadFileBrowserFormContainer from 'ui/file-browser/upload/UploadFileBrowserFormContainer';

describe('UploadFileBrowserPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UploadFileBrowserPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify buttons', () => {
    expect(component.find('Button')).toHaveLength(3);
  });

  it('verify if button upload exist', () => {
    expect(component.find('.UploadFileBrowserPage__uploadFile')).toHaveLength(1);
  });

  it('verify if button create folder exist', () => {
    expect(component.find('.UploadFileBrowserPage__createFolder')).toHaveLength(1);
  });

  it('verify if button create text file exist', () => {
    expect(component.find('.UploadFileBrowserPage__createTextFile')).toHaveLength(1);
  });

  it('verify if UploadFileBrowserFormContainer exist ', () => {
    expect(component.find(UploadFileBrowserFormContainer).exists()).toBe(true);
  });

  it('verify if Breadcrumb exist ', () => {
    expect(component.find('.UploadFileBrowserPage__fileBreadcrumbContainer').exists()).toBe(true);
  });
});
