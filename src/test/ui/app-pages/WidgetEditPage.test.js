import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetEditPage from 'ui/app-pages/WidgetEditPage';

describe('WidgetEditPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetEditPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class WidgetEditPage', () => {
    expect(component.find('InternalPage').hasClass('WidgetEditPage')).toEqual(true);
  });

  it('verify if exist Breacrumb component', () => {
    expect(component.find('Breadcrumb').exists()).toEqual(true);
  });
});
