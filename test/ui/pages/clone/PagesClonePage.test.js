import React from 'react';

import 'test/enzyme-init';
import { PagesClonePageBody } from 'ui/pages/clone/PagesClonePage';
import { shallowWithIntl } from 'test/legacyTestUtils';


describe('PagesClonePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallowWithIntl(<PagesClonePageBody />);
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PagesClonePage class', () => {
    expect(component.hasClass('PagesClonePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
