import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl, mockIntl, mockRenderWithRouter } from 'test/legacyTestUtils';

import RenderTextAreaInput from 'ui/common/formik-field/RenderTextAreaInput';
import CreateTextFileForm, { CreateTextFileFormBody } from 'ui/file-browser/common/CreateTextFileForm';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../../../test/testUtils';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();

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
      history: { location: {} },
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
  });

  it('has select', () => {
    const element = createTextFileForm.find('Field[name="extension"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', 'select');
  });

  it('has RenderTextAreaInput', () => {
    const element = createTextFileForm.find('Field[name="content"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextAreaInput);
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

  it('on form submit calls handleSubmit', async () => {
    const props = {
      isSubmitting: false,
      isValid: true,
      onSubmit,
      handleSubmit,
      intl: mockIntl,
      initialValues: {
        name: 'nametest',
        content: 'contento',
        extension: '.txt',
      },
      history: { location: {} },
    };
    renderWithIntl(mockRenderWithRouter(<CreateTextFileForm {...props} />));
    const btn = screen.getByRole('button', { name: /save/i });
    await fireEvent.click(btn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
