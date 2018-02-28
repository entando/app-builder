import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';

describe('WidgetListRow', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetListRow name="test" code="WTF" used="2" />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
