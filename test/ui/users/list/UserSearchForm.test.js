import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import UserSearchForm from 'ui/users/list/UserSearchForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../../../test/testUtils';

const handleSubmit = jest.fn();
const setProfileType = jest.fn();
const onDidMount = jest.fn();
const onUnmount = jest.fn();
const onSubmit = jest.fn();

jest.unmock('react-redux');

describe('UserSearchForm', () => {
  let userSearchForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });

  const props = {
    submitting,
    invalid,
    handleSubmit,
    onSubmit,
    setProfileType,
    onDidMount,
    onUnmount,
    isValid: true,
    isSubmitting: false,
    initialValues: { withProfile: 'all', username: '' },
  };
  const buildUserSearchForm = () =>
    mount(mockRenderWithIntlAndStore(<UserSearchForm {...props} />));

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
    it('on form submit calls handleSubmit', async () => {
      renderWithIntl(<UserSearchForm {...props} />);
      const btn = screen.getByRole('button', { name: /search/i });
      await fireEvent.click(btn);
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
});
