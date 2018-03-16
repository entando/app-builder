import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';

describe('DataModelListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataModelListPage />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
