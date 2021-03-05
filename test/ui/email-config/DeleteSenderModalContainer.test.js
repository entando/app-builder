import React from 'react';
import * as reactRedux from 'react-redux';
import { screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import DeleteSenderModalContainer from 'ui/email-config/DeleteSenderModalContainer';
import { renderWithIntlAndState } from 'test/rtlTestUtils';
import { SET_VISIBLE_MODAL } from 'state/modal/types';

jest.unmock('react-redux');
jest.unmock('redux-form');

jest.mock('state/email-config/actions', () => ({
  deleteEmailSender: jest.fn(payload => ({ type: 'deleteEmailSender_test', payload })),
}));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('DeleteSenderModalContainer', () => {
  const info = {
    type: 'sender',
    code: 'testcode',
  };
  const state = {
    modal: {
      visibleModal: 'DeleteSenderModal',
      info,
    },
  };

  const setupModal = () => {
    const utils = renderWithIntlAndState(<DeleteSenderModalContainer />, { state });
    const modalView = within(screen.getAllByRole('dialog')[0]);
    return { modalView, ...utils };
  };

  it('should render the correct title', () => {
    const { modalView } = setupModal();
    expect(modalView.getByRole('heading', { level: 4, name: `Delete ${info.type}` })).toBeInTheDocument();
  });

  it('should show a confirmation message', () => {
    const { modalView } = setupModal();
    expect(modalView.getByText(`Do you really want to delete ${info.code}?`)).toBeInTheDocument();
  });

  it('should render "Delete" button that calls the correct actions when clicked', () => {
    const { modalView } = setupModal();
    const deleteBtn = modalView.getByRole('button', { name: 'Delete' });
    userEvent.click(deleteBtn);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'deleteEmailSender_test', payload: info.code });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: SET_VISIBLE_MODAL, payload: { visibleModal: '' } });
  });
});
