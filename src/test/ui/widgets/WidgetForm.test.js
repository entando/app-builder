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

  it('root component renders code field', () => {
    widgetForm = buildWidgetForm();
    const code = widgetForm.find('[name="code"]');
    expect(code.exists()).toEqual(true);
  });

  it('root component renders titles.it field', () => {
    widgetForm = buildWidgetForm();
    const titlesIt = widgetForm.find('[name="titles.it"]');
    expect(titlesIt.exists()).toEqual(true);
  });

  it('root component renders titles.en field', () => {
    widgetForm = buildWidgetForm();
    const titlesEn = widgetForm.find('[name="titles.en"]');
    expect(titlesEn.exists()).toEqual(true);
  });

  it('root component renders group field', () => {
    widgetForm = buildWidgetForm();
    const group = widgetForm.find('[name="group"]');
    expect(group.exists()).toEqual(true);
  });

  it('root component renders customUi field', () => {
    widgetForm = buildWidgetForm();
    const customUi = widgetForm.find('[name="customUi"]');
    expect(customUi.exists()).toEqual(true);
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
