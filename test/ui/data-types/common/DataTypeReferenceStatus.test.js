import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataTypeReferenceStatus from 'ui/data-types/common/DataTypeReferenceStatus';


const props = {
  onWillMount: jest.fn(),
  onReload: jest.fn(),
  status: {
    type: 'warning',
    status: 'toRefresh',
    dataTypesCode: ['CCC'],
  },
};

describe('DataTypeReferenceStatus', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataTypeReferenceStatus {...props} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has Alert component', () => {
    expect(component.find('Alert').exists());
  });

  it('has no Alert component', () => {
    component = shallow(<DataTypeReferenceStatus {...props} status={{ type: 'success' }} />);
    expect(component.find('Alert').exists()).toBe(false);
  });

  it('has class DataTypeReferenceStatus__text ', () => {
    expect(component.hasClass('DataTypeReferenceStatus')).toBe(true);
  });
});
