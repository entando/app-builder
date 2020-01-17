import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';

import EditUserPage from 'ui/users/edit/EditUserPage';
import { shallowWithIntl } from '../../../test/testUtils';

describe('EditUserPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<EditUserPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditUserPage', () => {
    expect(component.find('InternalPage').hasClass('EditUserPage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
