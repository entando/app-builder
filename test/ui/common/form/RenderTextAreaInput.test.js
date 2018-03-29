import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';

const INPUT = { name: 'textAreaInput', value: 'sample text' };
const LABEL = 'Some Text';
const META = { touched: true, error: '' };
const META_WITH_ERROR = { touched: true, error: 'Required' };

describe('RenderTextInput', () => {
  let textInput;

  it('render component without crash', () => {
    const element = RenderTextAreaInput({ input: INPUT, label: LABEL, meta: META });
    textInput = shallow(element);
    expect(textInput.exists()).toBe(true);
  });

  it('render error message for textInput', () => {
    const element = RenderTextAreaInput({ input: INPUT, label: LABEL, meta: META_WITH_ERROR });
    textInput = shallow(element);
    const textInputHelpBlock = textInput.find('.help-block').first();
    expect(textInputHelpBlock.exists()).toBe(true);
    expect(textInputHelpBlock.text()).toBe('Required');
  });
});
