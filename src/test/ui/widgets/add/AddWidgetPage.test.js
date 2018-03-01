import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';

describe('AddWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddWidgetPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddWidgetPage', () => {
    expect(component.find('InternalPage').hasClass('AddWidgetPage')).toEqual(true);
  });
});
