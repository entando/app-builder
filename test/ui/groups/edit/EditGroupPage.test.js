import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { EditGroupPageBody } from 'ui/groups/edit/EditGroupPage';

describe('EditGroupPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditGroupPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditGroupPage', () => {
    expect(component.find('InternalPage').hasClass('EditGroupPage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
