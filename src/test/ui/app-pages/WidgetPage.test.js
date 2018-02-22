import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetPage from 'ui/app-pages/WidgetPage';

describe('WidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class WidgetPage', () => {
    expect(component.find('InternalPage').hasClass('WidgetPage')).toEqual(true);
  });
});
