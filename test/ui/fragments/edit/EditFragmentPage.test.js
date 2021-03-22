import React from 'react';

import 'test/enzyme-init';
import EditFragmentPage from 'ui/fragments/edit/EditFragmentPage';
import { shallowWithIntl } from 'test/legacyTestUtils';

describe('EditFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<EditFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('EditFragmentPage')).toEqual(true);
  });
});
