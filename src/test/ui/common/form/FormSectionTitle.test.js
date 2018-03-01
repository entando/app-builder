import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

describe('FormSectionTitle', () => {
  let textInput;

  it('render component without crash', () => {
    textInput = shallow(<FormSectionTitle titleId="pippo" />);
    expect(textInput.exists()).toBe(true);
  });
});
