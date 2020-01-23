import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl, mockIntl } from 'test/testUtils';
import { required } from '@entando/utils';

import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import { CreateTextFileFormBody, maxLength50 } from 'ui/file-browser/common/CreateTextFileForm';

const handleSubmit = jest.fn();

describe('CreateTextFileForm', () => {
  beforeEach(jest.clearAllMocks);

  let createTextFileForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });

  const buildCreateTextFileForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      intl: mockIntl,
    };

    return shallowWithIntl(<CreateTextFileFormBody {...props} />);
  };


  it('root component renders without crashing', () => {
    createTextFileForm = buildCreateTextFileForm();
    expect(createTextFileForm.exists()).toBe(true);
  });

  it('has RenderTextInput', () => {
    const element = createTextFileForm.find('Field[name="name"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required, maxLength50]);
  });

  it('has select', () => {
    const element = createTextFileForm.find('Field[name="extension"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', 'select');
    expect(props).toHaveProperty('validate', [required]);
  });

  it('has RenderTextAreaInput', () => {
    const element = createTextFileForm.find('Field[name="content"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextAreaInput);
    expect(props).toHaveProperty('validate', [required]);
  });

  it('has a Buttons  save and cancel', () => {
    expect(createTextFileForm.find('Button')).toHaveLength(2);
    expect(createTextFileForm.find('Button').first().hasClass('CreateTextFileForm__btn-submit')).toBe(true);
    expect(createTextFileForm.find('Button').last().hasClass('CreateTextFileForm__btn-cancel')).toBe(true);
  });

  it('disables submit button while submitting', () => {
    submitting = true;
    createTextFileForm = buildCreateTextFileForm();
    const submitButton = createTextFileForm.find('.CreateTextFileForm__btn-submit');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    createTextFileForm = buildCreateTextFileForm();
    const submitButton = createTextFileForm.find('.CreateTextFileForm__btn-submit');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('on form submit calls handleSubmit', () => {
    createTextFileForm = buildCreateTextFileForm();
    const preventDefault = jest.fn();
    createTextFileForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
