import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ContentWidgetElement from 'ui/pages/config/ContentWidgetElement';

describe('PageTreeCompact', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ContentWidgetElement />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
