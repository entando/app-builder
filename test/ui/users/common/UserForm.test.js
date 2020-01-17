import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserFormBody, renderStaticField } from 'ui/users/common/UserForm';
import { runValidators, mockRenderWithIntl } from 'test/testUtils';

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
      msgs: {
        username: { id: 'username', defaultMessage: 'username' },
      },
    };

    return shallow(mockRenderWithIntl(<UserFormBody {...props} />));
  };

  it('root component renders without crashing', () => {
    userForm = buildUserForm();
    expect(userForm.exists()).toEqual(true);
  });

  it('root component render minus icon if staticField value is null', () => {
    const input = { name: 'registration', value: '' };
    const name = 'registration';
    const label = <label htmlFor={name}>registration</label>;
    const element = shallow(renderStaticField({ input, label, name }));
    expect(element.find('.icon')).toExist();
    expect(element.find('.icon').hasClass('fa-minus')).toBe(true);
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
    beforeEach(() => {
      userForm = buildUserForm();
    });

    it('root component renders username field', () => {
      const username = userForm.find('[name="username"]');
      expect(username.exists()).toEqual(true);
    });

    describe('username validation', () => {
      let validatorArray;
      beforeEach(() => {
        validatorArray = userForm.find('[name="username"]').prop('validate');
      });

      it('is required', () => {
        expect(runValidators(validatorArray, '').props.id).toBe('validateForm.required');
      });

      it('is invalid if input is shorter than 4 chars', () => {
        expect(runValidators(validatorArray, '123').props.id).toBe('validateForm.minLength');
        expect(runValidators(validatorArray, '1234')).toBeFalsy();
      });

      it('is invalid if input is longer than 20 chars', () => {
        expect(runValidators(validatorArray, '123456789abcdefghijk')).toBeFalsy();
        expect(runValidators(validatorArray, '123456789abcdefghijkl').props.id)
          .toBe('validateForm.maxLength');
      });
    });

    it('root component renders status field', () => {
      const status = userForm.find('[name="status"]');
      expect(status.exists()).toEqual(true);
    });

    it('root component renders profileType field', () => {
      const status = userForm.find('[name="profileType"]');
      expect(status.exists()).toEqual(true);
    });

    describe('password field', () => {
      let passwordField;
      beforeEach(() => {
        passwordField = userForm.find('[name="password"]');
      });

      it('is rendered', () => {
        expect(passwordField).toExist();
      });

      describe('validation', () => {
        let validatorArray;
        beforeEach(() => {
          validatorArray = passwordField.prop('validate');
        });

        it('is required', () => {
          expect(runValidators(validatorArray, '').props.id).toBe('validateForm.required');
        });

        it('is invalid if input is shorter than 8 chars', () => {
          expect(runValidators(validatorArray, '1234567').props.id).toBe('validateForm.minLength');
          expect(runValidators(validatorArray, '12345678')).toBeFalsy();
        });

        it('is invalid if input is longer than 20 chars', () => {
          expect(runValidators(validatorArray, '123456789abcdefghijk')).toBeFalsy();
          expect(runValidators(validatorArray, '123456789abcdefghijkl').props.id)
            .toBe('validateForm.maxLength');
        });
      });
    });

    describe('passwordConfirm field', () => {
      const ALL_VALUES = { password: '12345678' };
      let passwordConfirmField;
      beforeEach(() => {
        passwordConfirmField = userForm.find('[name="passwordConfirm"]');
      });

      it('is rendered', () => {
        expect(passwordConfirmField).toExist();
      });

      describe('validation', () => {
        let validatorArray;
        beforeEach(() => {
          validatorArray = passwordConfirmField.prop('validate');
        });

        it('is required', () => {
          expect(runValidators(validatorArray, '').props.id).toBe('validateForm.required');
        });

        it('is invalid if input does not match the password', () => {
          expect(runValidators(validatorArray, 'abcdefgh', ALL_VALUES).props.id)
            .toBe('validateForm.passwordNotMatch');
          expect(runValidators(validatorArray, ALL_VALUES.password, ALL_VALUES)).toBeFalsy();
        });
      });
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
