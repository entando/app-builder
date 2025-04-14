import React from 'react';

import 'test/enzyme-init';
import CreateFolderForm, { CreateFolderFormBody } from 'ui/file-browser/add/CreateFolderForm';
import { shallowWithIntl, mockIntl, mockRenderWithRouter } from 'test/legacyTestUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../../../test/testUtils';

const handleSubmit = jest.fn();
const onWillMount = jest.fn();
const onSubmit = jest.fn();

jest.unmock('react-redux');

describe('CreateFolderForm', () => {
  beforeEach(jest.clearAllMocks);

  let createFolderForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });

  const buildCreateFolderForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      intl: mockIntl,
      history: { location: {} },
    };

    return shallowWithIntl(<CreateFolderFormBody {...props} />);
  };


  it('root component renders without crashing', () => {
    createFolderForm = buildCreateFolderForm();
    expect(createFolderForm.exists()).toEqual(true);
  });

  it('has a Buttons  save and cancel', () => {
    expect(createFolderForm.find('Button')).toHaveLength(2);
    expect(createFolderForm.find('Button').first().hasClass('FileBrowserCreateFolderForm__btn-submit')).toBe(true);
    expect(createFolderForm.find('Button').last().hasClass('FileBrowserCreateFolderForm__btn-cancel')).toBe(true);
  });

  it('disables submit button while submitting', () => {
    submitting = true;
    createFolderForm = buildCreateFolderForm();
    const submitButton = createFolderForm.find('.FileBrowserCreateFolderForm__btn-submit');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    createFolderForm = buildCreateFolderForm();
    const submitButton = createFolderForm.find('.FileBrowserCreateFolderForm__btn-submit');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('on form submit calls onSubmit', async () => {
    const props = {
      isSubmitting: false,
      isValid: true,
      handleSubmit,
      onSubmit,
      onWillMount,
      intl: mockIntl,
      history: { location: {} },
      initialValues: {
        name: 'name',
        path: 'folderName',
      },
    };
    renderWithIntl(mockRenderWithRouter(<CreateFolderForm {...props} />));
    const btn = screen.getByRole('button', { name: /save/i });
    await fireEvent.click(btn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
