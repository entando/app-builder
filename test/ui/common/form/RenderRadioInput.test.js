import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';

const onChangeMock = jest.fn();

const TOGGLE_ELEMENT = [{
  id: 'field1',
  label: 'Field 1',
},
{
  id: 'field2',
  label: 'Field 2',
},
{
  id: 'field3',
  label: 'Field 3',
}];

const INPUT = {
  name: 'base',
  value: 'field2',
  onChange: onChangeMock,
};

describe('RenderRadioInput', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow((
      <RenderRadioInput
        input={INPUT}
        toggleElement={TOGGLE_ELEMENT}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders three ToggleButton elements', () => {
    expect(component.find('ToggleButton')).toHaveLength(3);
  });

  it('calls onChange on ToggleButton\'s onChange', () => {
    component.find('[name="base"]').prop('onChange')(INPUT.value);
    expect(onChangeMock).toHaveBeenCalledWith(INPUT.value);
  });
});
