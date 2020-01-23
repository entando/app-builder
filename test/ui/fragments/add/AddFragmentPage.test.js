import React from 'react';

import 'test/enzyme-init';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import { shallowWithIntl } from 'test/testUtils';

describe('AddFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<AddFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('AddFragmentPage')).toEqual(true);
  });
});
