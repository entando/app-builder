import React from 'react';
import 'test/enzyme-init';

import { shallowWithIntl, mockIntl } from 'test/legacyTestUtils';
import MyProfilePage from 'ui/users/my-profile/MyProfilePage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AccountFormContainer from 'ui/users/my-profile/AccountFormContainer';

describe('MyProfilePage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<MyProfilePage intl={mockIntl} />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class MyProfilePage', () => {
    expect(component.find('InternalPage').hasClass('MyProfilePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('has the errors container', () => {
    expect(component.find(ErrorsAlertContainer).exists());
  });

  it('verify if has the password form', () => {
    expect(component.find(AccountFormContainer).exists());
  });
});
