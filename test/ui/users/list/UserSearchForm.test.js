import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import UserSearchForm from 'ui/users/list/UserSearchForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const handleSubmit = jest.fn();
const setProfileType = jest.fn();
const onWillMount = jest.fn();

jest.unmock('react-redux');
jest.unmock('redux-form');

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

    return mount(mockRenderWithIntlAndStore(<UserSearchForm {...props} />));
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
      expect(withProfile).not.toExist();
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
