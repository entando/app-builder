import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetSectionTitle from 'ui/widget-list-page/WidgetSectionTitle';

describe('ui/widget-list-page/WidgetSectionTitle', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetSectionTitle />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
