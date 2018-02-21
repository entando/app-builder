import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WidgetFormBody } from 'ui/widgets/WidgetForm';

const handleSubmit = jest.fn();

describe('WidgetForm', () => {
  let widgetForm = null;
  let submitting;
  let touched;
  let error;
  let invalid;

  beforeEach(() => {
    submitting = false;
    touched = false;
    invalid = false;
    error = null;
  });
  const buildWidgetForm = () => {
    const props = {
      submitting,
      invalid,

      fields: {
        showletTypeCode: {
          value: 'test_widget',
          touched,
          error,
        },
      },
      handleSubmit,
    };
    return shallow(<WidgetFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    widgetForm = buildWidgetForm();
    expect(widgetForm.exists()).toEqual(true);
  });

  it('root component renders showletTypeCode field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="showletTypeCode"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('root component renders italianTitle field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="italianTitle"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('root component renders englishTitle field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="englishTitle"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('root component renders mainGroup field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="mainGroup"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('root component renders gui field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="gui"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('root component renders showletTypeCode field', () => {
    widgetForm = buildWidgetForm();
    const widgetTypeCode = widgetForm.find('[name="showletTypeCode"]');
    expect(widgetTypeCode.exists()).toEqual(true);
  });

  it('disables submit button while submitting', () => {
    submitting = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('button[type="submit"]');
    expect(submitButton.props().disabled).toEqual(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('button[type="submit"]');
    expect(submitButton.props().disabled).toEqual(true);
  });

  it('on tab click calls preventDefault', () => {
    widgetForm = buildWidgetForm();
    const noFunc = { preventDefault: jest.fn() };
    widgetForm.find('[data-toggle="tab"]').simulate('click', noFunc);
    expect(noFunc.preventDefault).toHaveBeenCalled();
  });

  it('on form submit calls handleSubmit', () => {
    widgetForm = buildWidgetForm();
    const preventDefault = jest.fn();
    widgetForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
