import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';

describe('ui/widgets/list/WidgetSectionTitle', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetSectionTitle />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
