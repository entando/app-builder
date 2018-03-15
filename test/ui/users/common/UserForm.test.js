import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserFormBody } from 'ui/users/common/UserForm';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();

describe('UserForm', () => {
  let userForm;
  let submitting;
  let invalid;
  let profileTypes;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildUserForm = (mode) => {
    const props = {
      profileTypes,
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      onSubmit,
      mode,
    };

    return shallow(<UserFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    userForm = buildUserForm();
    expect(userForm.exists()).toEqual(true);
  });

  describe('test with mode = new', () => {
    it('root component renders username field', () => {
      userForm = buildUserForm();
      const username = userForm.find('[name="username"]');
      expect(username.exists()).toEqual(true);
    });

    it('root component renders password field', () => {
      userForm = buildUserForm();
      const password = userForm.find('[name="password"]');
      expect(password.exists()).toEqual(true);
    });

    it('root component renders passwordConfirm field', () => {
      userForm = buildUserForm();
      const passwordConfirm = userForm.find('[name="passwordConfirm"]');
      expect(passwordConfirm.exists()).toEqual(true);
    });

    it('root component renders status field', () => {
      userForm = buildUserForm();
      const status = userForm.find('[name="status"]');
      expect(status.exists()).toEqual(true);
    });

    it('root component renders profileType field', () => {
      userForm = buildUserForm();
      const status = userForm.find('[fieldName="profileType"]');
      expect(status.exists()).toEqual(true);
    });
  });

  describe('test buttons and handlers', () => {
    it('disables submit button while submitting', () => {
      submitting = true;
      userForm = buildUserForm();
      const submitButton = userForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      invalid = true;
      userForm = buildUserForm();
      const submitButton = userForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('on form submit calls handleSubmit', () => {
      userForm = buildUserForm();
      const preventDefault = jest.fn();
      userForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
