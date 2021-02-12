import React from 'react';

import 'test/enzyme-init';
import CloneFragmentPage from 'ui/fragments/clone/CloneFragmentPage';
import { shallowWithIntl } from 'test/testUtils';

describe('CloneFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<CloneFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class CloneFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('CloneFragmentPage')).toEqual(true);
  });
});
