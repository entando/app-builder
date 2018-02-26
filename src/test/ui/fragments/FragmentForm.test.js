import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { FragmentFormBody } from 'ui/fragments/FragmentForm';

const handleSubmit = jest.fn();

describe('FragmentForm', () => {
  let fragmentForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildFragmentForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
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

  it('root component renders customUi field', () => {
    fragmentForm = buildFragmentForm();
    const customUi = fragmentForm.find('[name="guiCode"]');
    expect(customUi.exists()).toEqual(true);
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
