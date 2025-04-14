import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as reactRedux from 'react-redux';

import { renderWithState } from 'test/testUtils';
import AddEmailSenderFormContainer from 'ui/email-config/AddEmailSenderFormContainer';
import EmailSenderForm from 'ui/email-config/EmailSenderForm';

jest.unmock('react-redux');

jest.mock('state/email-config/actions', () => ({
  addEmailSender: jest.fn(payload => ({ type: 'addEmailSender_test', payload })),
}));

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

jest.mock('ui/email-config/EmailSenderForm', () => jest.fn(mockProps => (
  <div>
    <button onClick={() => mockProps.onSubmit({})}>onSubmit</button>
  </div>
)));

const setupAddEmailSenderFormContainer = () => {
  const utils = renderWithState(<AddEmailSenderFormContainer />);
  const simulateSubmit = () => utils.getByText('onSubmit').click();

  return {
    ...utils,
    simulateSubmit,
  };
};

describe('AddEmailSenderFormContainer', () => {
  afterEach(() => {
    mockDispatch.mockClear();
  });

  it('passes initialValues to EmailSenderForm with the correct values', () => {
    setupAddEmailSenderFormContainer();

    expect(EmailSenderForm).toHaveBeenCalledWith(expect.objectContaining({
      initialValues: { code: '', email: '' },
    }), {});
  });

  it('calls the correct email sender action when EmailSenderForm is submitted', () => {
    const { simulateSubmit } = setupAddEmailSenderFormContainer();

    simulateSubmit();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'addEmailSender_test', payload: {} });
  });
});
