import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserSearchFormBody } from 'ui/users/list/UserSearchForm';
import { shallowWithIntl } from '../../../test/testUtils';

const handleSubmit = jest.fn();
const setProfileType = jest.fn();
const onWillMount = jest.fn();

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
      onWillMount,
    };

    return shallowWithIntl(<UserSearchFormBody {...props} />);
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      userSearchForm = buildUserSearchForm();
    });
    it('root component renders without crashing', () => {
      expect(userSearchForm).toExist();
    });

    it('root component renders username field', () => {
      const username = userSearchForm.find('.UserSearchForm__username');
      expect(username).toExist();
    });

    it('root component renders withProfile field', () => {
      const withProfile = userSearchForm.find('.UserSearchForm__withProfile');
      expect(withProfile).toExist();
    });
  });

  describe('event handlers test', () => {
    const preventDefault = jest.fn();
    beforeEach(() => {
      userSearchForm = buildUserSearchForm();
    });

    it('on form submit calls handleSubmit', () => {
      userSearchForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
