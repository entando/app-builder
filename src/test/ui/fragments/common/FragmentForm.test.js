import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { FragmentFormBody, renderDefaultGuiCodeField, renderStaticField } from 'ui/fragments/common/FragmentForm';

const handleSubmit = jest.fn();

describe('FragmentForm', () => {
  let fragmentForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildFragmentForm = (mode) => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      mode,
    };

    return shallow(<FragmentFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    fragmentForm = buildFragmentForm();
    expect(fragmentForm.exists()).toEqual(true);
  });

  it('root component renders code field', () => {
    fragmentForm = buildFragmentForm();
    const code = fragmentForm.find('[name="code"]');
    expect(code.exists()).toEqual(true);
  });

  it('root component renders guiCode field', () => {
    fragmentForm = buildFragmentForm();
    const customUi = fragmentForm.find('[name="guiCode"]');
    expect(customUi.exists()).toEqual(true);
  });

  it('root component renders defaultGuiCode Field on edit mode', () => {
    fragmentForm = buildFragmentForm('edit');
    const defaultGuiCode = fragmentForm.find('[name="defaultGuiCode"]');
    expect(defaultGuiCode.exists()).toEqual(true);
  });

  it('root component does not render widgetType Field if its value is null', () => {
    const input = { name: 'widgetType', value: '' };
    const name = 'widgetType';
    const label = <label htmlFor={name}>widgetType</label>;
    const element = renderStaticField({ input, label, name });
    expect(element).toEqual(null);
  });

  it('root component renders widgetType Field if its value is not null', () => {
    const input = { name: 'widgetType', value: 'widgetType' };
    const name = 'widgetType';
    const label = <label htmlFor={name}>widgetType</label>;
    const element = renderStaticField({ input, label, name });
    const widgetType = shallow(element);
    expect(widgetType.find('.form-group').exists()).toEqual(true);
  });

  it('root component renders pluginCode Field on edit mode', () => {
    fragmentForm = buildFragmentForm('edit');
    const defaultGuiCode = fragmentForm.find('[name="pluginCode"]');
    expect(defaultGuiCode.exists()).toEqual(true);
  });

  it('root component renders an Alert if defaultGuiCode is undefined', () => {
    const input = { name: 'defaultGuiCode', value: '' };
    const element = renderDefaultGuiCodeField({ input });
    const defaultGuiCode = shallow(element);
    expect(defaultGuiCode.find('.alert.alert-info').exists()).toEqual(true);
  });

  it('root component renders a Panel if defaultGuiCode is defined on edit mode', () => {
    const input = { name: 'defaultGuiCode', value: '<p>Default Gui Code</p>' };
    const element = renderDefaultGuiCodeField({ input });
    const defaultUi = shallow(element);
    expect(defaultUi.find('Panel PanelBody pre').exists()).toEqual(true);
  });

  it('disables submit button while submitting', () => {
    submitting = true;
    fragmentForm = buildFragmentForm();
    const submitButton = fragmentForm.find('Button');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    fragmentForm = buildFragmentForm();
    const submitButton = fragmentForm.find('Button');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('on form submit calls handleSubmit', () => {
    fragmentForm = buildFragmentForm();
    const preventDefault = jest.fn();
    fragmentForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
