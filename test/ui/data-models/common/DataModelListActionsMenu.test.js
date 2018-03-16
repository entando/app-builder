import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataModelListActionsMenu from 'ui/data-models/common/DataModelListActionsMenu';

describe('WidgetListMenuAction', () => {
  beforeEach(jest.clearAllMocks);
  it('renders without crashing', () => {
    const component = shallow(<DataModelListActionsMenu />);
    expect(component.exists()).toBe(true);
  });
});
