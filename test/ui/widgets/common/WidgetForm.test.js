import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl, mockIntl } from 'test/legacyTestUtils';
import { WidgetFormBody, renderDefaultUIField } from 'ui/widgets/common/WidgetForm';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

const onSubmit = jest.fn();
const onWillMount = jest.fn();
const setFieldValue = jest.fn();
const handleSubmit = jest.fn();

describe('WidgetForm', () => {
  let widgetForm = null;
  let isSubmitting;
  let isValid;
  let groups;


  beforeEach(() => {
    isSubmitting = false;
    isValid = true;
    groups = [];
  });

  const buildWidgetForm = (mode) => {
    const props = {
      isSubmitting,
      isValid,
      onSubmit,
      handleSubmit,
      onWillMount,
      setFieldValue,
      groups,
      mode,
      languages: LANGUAGES,
      intl: mockIntl,
      noPortal: true,
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


  it('disables submit buttons while submitting', () => {
    isSubmitting = true;
    widgetForm = buildWidgetForm();
    const regularSaveButton = widgetForm.find('#regularSaveButton');
    expect(regularSaveButton.prop('disabled')).toEqual(true);
    const continueSaveButton = widgetForm.find('#continueSaveButton');
    expect(continueSaveButton.prop('disabled')).toEqual(true);
  });

  it('disables submit buttons if form is invalid', () => {
    isValid = false;
    widgetForm = buildWidgetForm();
    const regularSaveButton = widgetForm.find('#regularSaveButton');
    expect(regularSaveButton.prop('disabled')).toEqual(true);
    const continueSaveButton = widgetForm.find('#continueSaveButton');
    expect(continueSaveButton.prop('disabled')).toEqual(true);
  });

  it('on form submit calls handleSubmit', async () => {
    widgetForm = buildWidgetForm();
    const preventDefault = jest.fn();
    await widgetForm.find('#regularSaveButton').simulate('click', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
