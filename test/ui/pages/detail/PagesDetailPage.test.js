import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PagesDetailPage from 'ui/pages/detail/PagesDetailPage';

const props = {
  onWillMount: jest.fn(),
  references: [],
};

describe('PagesDetailPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PagesDetailPage {...props} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if exist InternalPage with class PageSettings', () => {
    expect(component.find('InternalPage').hasClass('PagesDetailPage')).toBe(true);
  });

  it('verify if exist Breacrumb component', () => {
    expect(component.find('Breadcrumb').exists()).toBe(true);
  });

  it('verify if exist Breacrumb component', () => {
    expect(component.find('Breadcrumb').exists()).toBe(true);
  });

  it('references is empty and show EmptyData ', () => {
    expect(component.find('EmptyData').exists()).toBe(true);
  });

  it('references is not empty and not show EmptyData ', () => {
    component = shallow(<PagesDetailPage {...props} references={['ref']} />);
    expect(component.find('EmptyData').exists()).toBe(false);
  });
});
