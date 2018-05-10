import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DatabaseListPage from 'ui/database/list/ListDatabasePage';

describe('DatabaseListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DatabaseListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class DatabaseListPage', () => {
    expect(component.find('InternalPage').hasClass('DatabaseListPage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });
});
