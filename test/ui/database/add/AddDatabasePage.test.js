import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import AddDatabasePage from 'ui/database/add/AddDatabasePage';


const props = {
  onWillMount: jest.fn(),
};

describe('AddDatabasePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddDatabasePage {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if the InternalPage has class AddDatabasePage', () => {
    expect(component.find('InternalPage').hasClass('AddDatabasePage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('call onWillMount', () => {
    expect(props.onWillMount).toHaveBeenCalled();
  });
});
