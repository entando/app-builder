import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageSettingsPageBody } from 'ui/pages/settings/PageSettings';

describe('WidgetEditPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageSettingsPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class PageSettings', () => {
    expect(component.find('InternalPage').hasClass('PageSettings')).toEqual(true);
  });

  it('verify if exist Breacrumb component', () => {
    expect(component.find('Breadcrumb').exists()).toEqual(true);
  });
});
