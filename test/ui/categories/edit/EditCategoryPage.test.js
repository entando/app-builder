import React from 'react';

import 'test/enzyme-init';
import { EditCategoryPageBody } from 'ui/categories/edit/EditCategoryPage';
import { shallowWithIntl } from 'test/testUtils';

describe('EditCategoryPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<EditCategoryPageBody />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if exist InternalPage with class EditCategoryPage', () => {
    expect(component.find('InternalPage').hasClass('EditCategoryPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
