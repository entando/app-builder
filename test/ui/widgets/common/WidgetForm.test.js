import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl, mockIntl } from 'test/testUtils';
import { WidgetFormBody, renderDefaultUIField } from 'ui/widgets/common/WidgetForm';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

const handleSubmit = jest.fn();
const onWillMount = jest.fn();

describe('WidgetForm', () => {
  let widgetForm = null;
  let submitting;
  let invalid;
  let groups;


  beforeEach(() => {
    submitting = false;
    invalid = false;
    groups = [];
  });

  const buildWidgetForm = (mode) => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      groups,
      mode,
      languages: LANGUAGES,
      intl: mockIntl,
    };

    return shallowWithIntl(<WidgetFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    widgetForm = buildWidgetForm();
    expect(widgetForm.exists()).toBe(true);
  });

  it('root component renders code field', () => {
    widgetForm = buildWidgetForm();
    const code = widgetForm.find('[name="code"]');
    expect(code.exists()).toBe(true);
  });

  it('root component does not render code Field on edit mode', () => {
    widgetForm = buildWidgetForm('edit');
    const defaultUi = widgetForm.find('[name="code"]');
    expect(defaultUi.exists()).toBe(false);
  });

  it('root component renders titles.it field', () => {
    widgetForm = buildWidgetForm();
    const titlesIt = widgetForm.find('[name="titles.it"]');
    expect(titlesIt.exists()).toBe(true);
  });

  it('root component renders titles.en field', () => {
    widgetForm = buildWidgetForm();
    const titlesEn = widgetForm.find('[name="titles.en"]');
    expect(titlesEn.exists()).toBe(true);
  });

  it('root component renders group field', () => {
    widgetForm = buildWidgetForm();
    const group = widgetForm.find('[name="group"]');
    expect(group.exists()).toBe(true);
  });

  it('root component renders customUi field', () => {
    widgetForm = buildWidgetForm();
    const customUi = widgetForm.find('[name="customUi"]');
    expect(customUi.exists()).toBe(true);
  });

  it('root component does not renders defaultUi Tab on new mode', () => {
    widgetForm = buildWidgetForm();
    const defaultUi = widgetForm.find('[name="defaultUi"]');
    expect(defaultUi.exists()).toBe(false);
  });

  it('root component renders a Panel if defaultUi is defined on edit mode', () => {
    const input = { name: 'defaultUi', value: '<p>Default UI</p>' };
    const element = renderDefaultUIField({ input });
    const defaultUi = shallowWithIntl(element);
    expect(defaultUi.find('Panel PanelBody pre').exists()).toBe(true);
  });

  it('root component renders an Alert if defaultUi is undefined on edit mode', () => {
    const input = { name: 'defaultUi', value: '' };
    const element = renderDefaultUIField({ input });
    const defaultUi = shallowWithIntl(element);
    expect(defaultUi.find('.alert.alert-info').exists()).toBe(true);
  });


  it('disables submit button while submitting', () => {
    submitting = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('Button').first();
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('Button').first();
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('on form submit calls handleSubmit', () => {
    widgetForm = buildWidgetForm();
    const preventDefault = jest.fn();
    widgetForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
