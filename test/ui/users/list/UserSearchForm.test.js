import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserSearchFormBody, renderSelectOptions } from 'ui/users/list/UserSearchForm';
import { PROFILE_TYPES_OPTIONS } from 'test/mocks/profileTypes';

const handleSubmit = jest.fn();
const setProfileType = jest.fn();

describe('UserSearchForm', () => {
  let userSearchForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildUserSearchForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      setProfileType,
    };

    return shallow(<UserSearchFormBody {...props} />);
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      userSearchForm = buildUserSearchForm();
    });
    it('root component renders without crashing', () => {
      expect(userSearchForm.exists()).toEqual(true);
    });

    it('root component renders username field', () => {
      const username = userSearchForm.find('[name="username"]');
      expect(username.exists()).toEqual(true);
    });

    it('root component renders profileType field', () => {
      const profileType = userSearchForm.find('[name="profileType"]');
      expect(profileType.exists()).toEqual(true);
    });

    it('root component renders withProfile Field', () => {
      const plugin = userSearchForm.find('[name="withProfile"]');
      expect(plugin.exists()).toEqual(true);
    });

    it('root component renders options for select input', () => {
      const options = renderSelectOptions(PROFILE_TYPES_OPTIONS);
      expect(options.length).toBe(PROFILE_TYPES_OPTIONS.length);
    });
  });

  describe('event handlers test', () => {
    const preventDefault = jest.fn();
    beforeEach(() => {
      userSearchForm = buildUserSearchForm();
    });

    it('on form submit calls handleSubmit', () => {
      userSearchForm
        .find('.UserSearchForm_set-profile-btn')
        .simulate('click', { preventDefault });
      expect(setProfileType).toHaveBeenCalled();
    });

    it('on form submit calls handleSubmit', () => {
      userSearchForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
