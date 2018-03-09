import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageConfigPage from 'ui/pages/config/PageConfigPage';

describe('PageConfigPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageConfigPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class PageConfigPage', () => {
    expect(component.find('InternalPage').hasClass('PageConfigPage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });
});
