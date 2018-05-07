import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

const INPUT = { name: 'textInput', value: 'sample text' };
const LABEL = 'Some Text';

describe('RenderTextInput', () => {
  let textInput;

  it('render component without crash', () => {
    const element = RenderDatePickerInput({ input: INPUT, label: LABEL });
    textInput = shallow(element);
    expect(textInput.exists()).toEqual(true);
  });
});
