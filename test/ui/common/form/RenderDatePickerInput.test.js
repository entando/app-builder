import 'test/enzyme-init';
import React from 'react';
import { shallow } from 'enzyme';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

const INPUT = {
  onChange: jest.fn(),
  value: '',
};

describe('RenderDatePickerInput', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RenderDatePickerInput input={INPUT} />);
  });

  it('render component without crash', () => {
    expect(component.exists()).toBe(true);
  });

  it('has DatePicker', () => {
    expect(component.find('DatePicker').exists()).toBe(true);
  });
});
