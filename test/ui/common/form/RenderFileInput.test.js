import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderFileInput from 'ui/common/form/RenderFileInput';

const onChange = jest.fn();
const onBlur = jest.fn();

const INPUT = {
  name: 'file',
  onChange,
  onBlur,
};
const LABEL = 'Some Text';
const META = { touched: true, error: '' };
const META_WITH_ERROR = { touched: true, error: 'Required' };
const event = { target: { files: [{}] } };

describe('RenderFileInput', () => {
  let fileInput;

  it('render component without crash', () => {
    const element = RenderFileInput({ input: INPUT, label: LABEL, meta: META });
    fileInput = shallow(element);
    expect(fileInput.exists()).toEqual(true);
  });

  it('render error message for fileInput', () => {
    const element = RenderFileInput({ input: INPUT, label: LABEL, meta: META_WITH_ERROR });
    fileInput = shallow(element);
    const fileInputHelpBlock = fileInput.find('.help-block').first();
    expect(fileInputHelpBlock.exists()).toEqual(true);
    expect(fileInputHelpBlock.text()).toEqual('Required');
  });

  it('on change, updates redux-form', () => {
    const element = RenderFileInput({ input: INPUT, label: LABEL, meta: META });
    fileInput = shallow(element);
    const fileOnChange = fileInput.find('input').prop('onChange');
    fileOnChange(event);
    expect(onChange).toHaveBeenCalled();
  });

  it('on blue, updates redux-form', () => {
    const element = RenderFileInput({ input: INPUT, label: LABEL, meta: META });
    fileInput = shallow(element);
    const fileOnBlur = fileInput.find('input').prop('onBlur');
    fileOnBlur(event);
    expect(onBlur).toHaveBeenCalled();
  });
});
