import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderCMSDateTimePickerInput from 'ui/common/form/RenderCMSDateTimePickerInput';

const getNumbersArray = maxValue => Array.from((Array(maxValue)).keys()).map(i => i + 1);
const optionsHours = getNumbersArray(24);
const optionsMinutes = getNumbersArray(60);
const optionsSeconds = getNumbersArray(60);

const input = {
  name: 'myDate',
  onChange: jest.fn(),
  value: '',
};
const name = '';
const label = '';
const help = '';
const locale = 'en';
const dateFormat = 'DD/MM/YYYY';
const placeholder = 'My date';
const meta = {
  touched: false,
  error: false,
};

const momentMock = {
  format: jest.fn(),
};


describe('RenderCMSDateTimePickerInput', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow((
      <RenderCMSDateTimePickerInput
        hoursList={optionsHours}
        minutesList={optionsMinutes}
        secondsList={optionsSeconds}
        input={input}
        name={name}
        label={label}
        help={help}
        locale={locale}
        dateFormat={dateFormat}
        placeholder={placeholder}
        meta={meta}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  describe('renders a date picker', () => {
    let datePicker;
    beforeEach(() => {
      datePicker = component.find('DatePicker');
    });

    it('of type DatePicker', () => {
      expect(datePicker).toExist();
    });

    it('with the provided placeholder', () => {
      expect(datePicker.prop('placeholder')).toBe(placeholder);
    });

    it('with the provided dateFormat', () => {
      expect(datePicker.prop('dateFormat')).toBe(dateFormat);
    });

    it('with the provided locale', () => {
      expect(datePicker.prop('locale')).toBe(locale);
    });
  });

  it('renders a hours select with 24 options', () => {
    const field = component.find(`Field[name="${input.name}.hours"]`);
    expect(field).toExist();
    expect(field.find('option')).toHaveLength(optionsHours.length);
  });

  it('renders a minutes select with 60 options', () => {
    const field = component.find(`Field[name="${input.name}.minutes"]`);
    expect(field).toExist();
    expect(field.find('option')).toHaveLength(optionsMinutes.length);
  });

  it('renders a seconds select with 60 options', () => {
    const field = component.find(`Field[name="${input.name}.seconds"]`);
    expect(field).toExist();
    expect(field.find('option')).toHaveLength(optionsMinutes.length);
  });

  it('this.handleChange calls input.onChange', () => {
    component.instance().handleChange(momentMock);
    expect(input.onChange).toHaveBeenCalled();
  });
});
