import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as reactRedux from 'react-redux';

import { renderWithIntlRouterState } from 'test/testUtils';
import EditEmailSenderFormContainer from 'ui/email-config/EditEmailSenderFormContainer';
import EmailSenderForm from 'ui/email-config/EmailSenderForm';
import { MOCK_EMAIL_SENDER } from 'test/mocks/emailConfig';

jest.unmock('react-redux');

jest.mock('state/email-config/actions', () => ({
  fetchEmailSender: jest.fn(payload => ({ type: 'fetchEmailSender_test', payload })),
  updateEmailSender: jest.fn(payload => ({ type: 'updateEmailSender_test', payload })),
}));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

jest.mock('ui/email-config/EmailSenderForm', () => jest.fn(mockProps => (
  <div>
    <button onClick={() => mockProps.onSubmit({})}>onSubmit</button>
  </div>
)));

const setupEditEmailSenderFormContainer = (state = {
  emailConfig: { selectedSender: MOCK_EMAIL_SENDER },
}) => {
  const utils = renderWithIntlRouterState(<EditEmailSenderFormContainer />, {
    state, initialRoute: '/email-config/senders/edit/testcode', path: '/email-config/senders/edit/:code',
  });
  const simulateSubmit = () => utils.getByText('onSubmit').click();

  return {
    ...utils,
    simulateSubmit,
  };
};

describe('EditEmailSenderFormContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('fetches email sender data when form mounts', () => {
    setupEditEmailSenderFormContainer();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchEmailSender_test', payload: 'testcode' });
  });

  it('passes initialValues to EmailSenderForm with the correct values', () => {
    setupEditEmailSenderFormContainer();

    expect(EmailSenderForm).toHaveBeenCalledWith(expect.objectContaining({
      initialValues: MOCK_EMAIL_SENDER,
    }), {});
  });

  it('calls the correct email sender action when EmailSenderForm is submitted', () => {
    const { simulateSubmit } = setupEditEmailSenderFormContainer();

    simulateSubmit();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'updateEmailSender_test', payload: {} });
  });
});

