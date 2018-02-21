import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { RenderField } from 'ui/widgets/WidgetForm';

//  const handleSubmit = jest.fn();

describe('RenderField', () => {
  let widgetTypeCode;

  it('render error message for widgetTypeCode', () => {
    const input = { name: 'widgetTypeCode', value: '' };
    const label = 'Code';
    const meta = { touched: true, error: 'Required' };
    const element = RenderField({ input, label, meta });
    widgetTypeCode = shallow(element);
    const firstNameHelpBlock = widgetTypeCode.find('.help-block').first();
    expect(firstNameHelpBlock.exists()).toEqual(true);
    expect(firstNameHelpBlock.text()).toEqual('Required');
  });
});
