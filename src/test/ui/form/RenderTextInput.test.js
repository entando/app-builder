import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderTextInput from 'ui/form/RenderTextInput';

const INPUT = { name: 'textInput', value: 'sample text' };
const LABEL = 'Some Text';
const META = { touched: true, error: '' };
const META_WITH_ERROR = { touched: true, error: 'Required' };

describe('RenderTextInput', () => {
  let textInput;

  it('render component without crash', () => {
    const element = RenderTextInput({ input: INPUT, label: LABEL, meta: META });
    textInput = shallow(element);
    expect(textInput.exists()).toEqual(true);
  });

  it('render error message for textInput', () => {
    const element = RenderTextInput({ input: INPUT, label: LABEL, meta: META_WITH_ERROR });
    textInput = shallow(element);
    const textInputHelpBlock = textInput.find('.help-block').first();
    expect(textInputHelpBlock.exists()).toEqual(true);
    expect(textInputHelpBlock.text()).toEqual('Required');
  });
});
