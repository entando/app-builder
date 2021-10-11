import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';
import { shallow } from 'enzyme';
import EditContentPage from 'ui/edit-content/EditContentPage';

configEnzymeAdapter();

describe('EditContentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditContentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
