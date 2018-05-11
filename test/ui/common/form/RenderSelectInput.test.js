import 'test/enzyme-init';
import React from 'react';
import { shallow } from 'enzyme';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

const FIELD_NAME = 'test-select';
const LABEL_ID = 'app.edit';
const SELECT_OPTIONS = [
  { value: 1, text: 'option 1' },
  { value: 2, text: 'option 2' },
  { value: 3, text: 'option 3' },
];

describe('RenderSelectInput', () => {
  let selectInput;
  beforeEach(() => {
    selectInput = shallow(<RenderSelectInput
      options={SELECT_OPTIONS}
      labelId={LABEL_ID}
      fieldName={FIELD_NAME}
      mandatory
    />);
  });

  it('render component without crash', () => {
    expect(selectInput.exists()).toEqual(true);
  });

  it('render options element for selectInput', () => {
    const options = selectInput.find('option');
    expect(options).toHaveLength(SELECT_OPTIONS.length);
    options.forEach((option, i) => {
      expect(option.prop('value')).toEqual(SELECT_OPTIONS[i].value);
      expect(option.text()).toEqual(SELECT_OPTIONS[i].text);
    });
  });
});
