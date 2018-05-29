import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataTypeReferenceStatus from 'ui/data-types/common/DataTypeReferenceStatus';


const props = {
  onWillMount: jest.fn(),
  status: {
    status: 'ready',
    type: 'success',
    dataTypesCode: [],
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

  it('has class DataTypeReferenceStatus__text ', () => {
    expect(component.hasClass('DataTypeReferenceStatus')).toBe(true);
  });

  it('has Label component', () => {
    expect(component.find('Label').exists());
  });

  it('has ul empty', () => {
    expect(component.find('ul').children()).toHaveLength(0);
  });

  it('has ul child', () => {
    const obj = {
      status: 'refreshing',
      type: 'warning',
      dataTypesCode: ['AAA', 'BBB'],
    };
    component = shallow(<DataTypeReferenceStatus {...props} status={obj} />);
    expect(component.find('ul').children()).toHaveLength(2);
  });
});
