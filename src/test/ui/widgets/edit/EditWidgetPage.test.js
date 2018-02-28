import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditWidgetPage from 'ui/widgets/edit/EditWidgetPage';

describe('WidgetEditPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditWidgetPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditWidgetPage', () => {
    expect(component.find('InternalPage').hasClass('EditWidgetPage')).toEqual(true);
  });

  it('verify if exist Breacrumb component', () => {
    expect(component.find('Breadcrumb').exists()).toEqual(true);
  });
});
