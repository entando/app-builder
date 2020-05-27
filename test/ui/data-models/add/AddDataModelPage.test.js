import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { AddDataModelPageBody } from 'ui/data-models/add/AddDataModelPage';

describe('AddDataModelPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddDataModelPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddDataModelPage', () => {
    expect(component.find('InternalPage').hasClass('AddDataModelPage')).toEqual(true);
  });
});
