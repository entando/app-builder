import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditTextFilePage from 'ui/file-browser/edit/EditTextFilePage';

describe('EditTextFilePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditTextFilePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
  it('has the FileBreadcrumbContainer Component', () => {
    expect(component.find('.CreateTextFilePage__fileBreadcrumbContainer')).toHaveLength(1);
  });
});
