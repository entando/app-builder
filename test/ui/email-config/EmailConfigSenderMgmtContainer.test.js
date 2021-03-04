import { screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as reactRedux from 'react-redux';

import { renderWithIntlRouterState } from 'test/testUtils';
import EmailConfigSenderMgmtContainer from 'ui/email-config/EmailConfigSenderMgmtContainer';
import { ROUTE_EMAIL_CONFIG_SENDERS_ADD } from 'app-init/router';
import { SET_VISIBLE_MODAL, SET_INFO } from 'state/modal/types';
import { MODAL_ID as DELETE_SENDER_MODAL_ID } from 'ui/email-config/DeleteSenderModal';

jest.unmock('react-redux');
jest.unmock('@entando/menu');

jest.mock('state/email-config/actions', () => ({
  fetchEmailSenders: jest.fn(() => ({ type: 'fetchEmailSenders_test' })),
}));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('EmailConfigSenderMgmtContainer', () => {
  const senders = [
    {
      code: 'test_code_1',
      email: 'test1@email.com',
    },
    {
      code: 'test_code_2',
      email: 'test2@email.com',
    },
  ];
  const state = {
    emailConfig: {
      senders,
    },
  };

  beforeEach(() => {
    renderWithIntlRouterState(<EmailConfigSenderMgmtContainer />, { state });
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('should fetch relevant data on initial render', () => {
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchEmailSenders_test' });
  });

  it('should render a table of senders', () => {
    const tableView = within(screen.getByRole('table'));
    const colHeaders = tableView.getAllByRole('columnheader');
    const rows = tableView.getAllByRole('row');
    const row1View = within(rows[1]);
    const row2View = within(rows[2]);
    const row1Cells = row1View.getAllByRole('cell');
    const row2Cells = row2View.getAllByRole('cell');
    expect(colHeaders[0]).toHaveTextContent('Code');
    expect(colHeaders[1]).toHaveTextContent('Email');
    expect(colHeaders[2]).toHaveTextContent('Actions');
    expect(row1Cells[0]).toHaveTextContent(senders[0].code);
    expect(row1Cells[1]).toHaveTextContent(senders[0].email);
    expect(within(row1Cells[2]).getByRole('menu')).toBeInTheDocument();
    expect(row2Cells[0]).toHaveTextContent(senders[1].code);
    expect(row2Cells[1]).toHaveTextContent(senders[1].email);
    expect(within(row2Cells[2]).getByRole('menu')).toBeInTheDocument();
  });

  it('should render a button that links to the add sender page', () => {
    const addBtn = screen.getByRole('link', { name: 'Add' });
    expect(addBtn).toHaveAttribute('href', ROUTE_EMAIL_CONFIG_SENDERS_ADD);
  });

  describe('table row actions', () => {
    it('should render the correct dropdown menu items and corresponding actions', () => {
      const tableView = within(screen.getByRole('table'));
      const dropdownMenus = tableView.getAllByRole('menu');
      const dropdownMenu1View = within(dropdownMenus[0]);
      const dropdownMenu2View = within(dropdownMenus[1]);

      expect(dropdownMenu1View.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', `/email-config/senders/edit/${senders[0].code}`);
      mockDispatch.mockClear();
      userEvent.click(dropdownMenu1View.getByRole('menuitem', { name: 'Delete' }));
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_VISIBLE_MODAL, payload: { visibleModal: DELETE_SENDER_MODAL_ID },
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: SET_INFO, payload: { info: { type: 'sender', sender: senders[0] } },
      });

      expect(dropdownMenu2View.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', `/email-config/senders/edit/${senders[1].code}`);
      mockDispatch.mockClear();
      userEvent.click(dropdownMenu2View.getByRole('menuitem', { name: 'Delete' }));
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_VISIBLE_MODAL, payload: { visibleModal: DELETE_SENDER_MODAL_ID },
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: SET_INFO, payload: { info: { type: 'sender', sender: senders[1] } },
      });
    });
  });
});
