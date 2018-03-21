import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserFormBody, renderStaticField } from 'ui/users/common/UserForm';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();
const EDIT_MODE = 'edit';

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

  it('root component does not render registration Field if its value is null', () => {
    const input = { name: 'registration', value: '' };
    const name = 'registration';
    const label = <label htmlFor={name}>registration</label>;
    const element = renderStaticField({ input, label, name });
    expect(element).toBe(null);
  });

  it('root component renders registration Field if its value is not null', () => {
    const input = { name: 'registration', value: 'registration' };
    const name = 'registration';
    const label = <label htmlFor={name}>registration</label>;
    const element = renderStaticField({ input, label, name });
    const registration = shallow(element);
    expect(registration.find('.form-group').exists()).toBe(true);
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

  describe('test with mode = edit', () => {
    beforeEach(() => {
      submitting = false;
      invalid = false;
      userForm = buildUserForm(EDIT_MODE);
    });
    it('root component has class UserForm__content-edit', () => {
      expect(userForm.find('.UserForm__content-edit').exists()).toBe(true);
    });

    it('root component contains edit fields', () => {
      expect(userForm.find('.UserForm__content-edit').find('Field')).toHaveLength(4);
      expect(userForm.find('[name="registration"]').exists()).toBe(true);
      expect(userForm.find('[name="lastLogin"]').exists()).toBe(true);
      expect(userForm.find('[name="lastPasswordChange"]').exists()).toBe(true);
      expect(userForm.find('[name="reset"]').exists()).toBe(true);
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
