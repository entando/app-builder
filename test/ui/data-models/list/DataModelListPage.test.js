import React from 'react';

import 'test/enzyme-init';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';
import { shallowWithIntl } from 'test/legacyTestUtils';

describe('DataModelListPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<DataModelListPage />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
