import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import ComponentList from 'ui/component-repository/components/list/ComponentList';

describe('ComponentList', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<ComponentList />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
