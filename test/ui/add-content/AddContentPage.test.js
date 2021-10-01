import React from 'react';

import { configEnzymeAdapter } from 'test/testUtils';
import { shallow } from 'enzyme';
import AddContentPage from 'ui/add-content/AddContentPage';

configEnzymeAdapter();

describe('AddContentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddContentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
