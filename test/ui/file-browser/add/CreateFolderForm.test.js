import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { CreateFolderFormBody } from 'ui/file-browser/add/CreateFolderForm';

const handleSubmit = jest.fn();
const onWillMount = jest.fn();

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
    };

    return shallow(<CreateFolderFormBody {...props} />);
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

  it('on form submit calls handleSubmit', () => {
    createFolderForm = buildCreateFolderForm();
    const preventDefault = jest.fn();
    createFolderForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
