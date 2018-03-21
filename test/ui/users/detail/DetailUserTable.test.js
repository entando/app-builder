import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_USER_LIST } from 'app-init/router';

import DetailUserTable from 'ui/users/detail/DetailUserTable';

describe('DetailUserTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailUserTable username="test" user={{}} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  it('verify click back button', () => {
    component.find('Button').simulate('click');
    expect(gotoRoute).toHaveBeenCalledWith(ROUTE_USER_LIST);
  });
});
