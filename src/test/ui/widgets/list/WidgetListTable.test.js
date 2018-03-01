import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';

describe('WidgetListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetListTable />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
