import React from 'react';
import { fireEvent, screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import * as reactRedux from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { renderWithIntlAndState } from 'test/testUtils';
import userEvent from '@testing-library/user-event';
import AddEmailSenderFormContainer from 'ui/email-config/AddEmailSenderFormContainer';

jest.unmock('react-redux');
jest.unmock('redux-form');

const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatch);

describe('AddEmailSenderFormContainer', () => {
  it('should render the correct heading', () => {
    renderWithIntlAndState(<AddEmailSenderFormContainer />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('New Sender');
  });

  describe('form', () => {
    const setupForm = () => {
      const formValues = {
        code: 'testcode',
        email: 'testemail@test.com',
      };
      const state = {
        form: {
          emailSender: {
            values: formValues,
          },
        },
      };
      const store = createStore(combineReducers({
        form: formReducer,
      }), state);
      const utils = renderWithIntlAndState(<AddEmailSenderFormContainer />, { store });
      const formView = within(screen.getByRole('form'));
      return { formView, formValues, ...utils };
    };

    it('should render code and email fields', () => {
      const { formView, formValues } = setupForm();
      expect(formView.getByRole('textbox', { name: 'Code' })).toHaveDisplayValue(formValues.code);
      expect(formView.getByRole('textbox', { name: 'Email' })).toHaveDisplayValue(formValues.email);
    });

    it('should render "Save" button that calls the correct action when clicked', () => {
      const { formView, formValues } = setupForm();
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toHaveAttribute('type', 'submit');
      mockDispatch.mockClear();
      userEvent.click(saveBtn);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'addEmailSender_test', payload: formValues });
    });

    it('should render a disabled "Save" button when code field is empty', () => {
      const { formView } = setupForm();
      const codeField = formView.getByRole('textbox', { name: 'Code' });
      fireEvent.change(codeField, { target: { value: '' } });
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toBeDisabled();
    });

    it('should render a disabled "Save" button when email field is empty', () => {
      const { formView } = setupForm();
      const emailField = formView.getByRole('textbox', { name: 'Email' });
      fireEvent.change(emailField, { target: { value: '' } });
      const saveBtn = formView.getByRole('button', { name: 'Save' });
      expect(saveBtn).toBeDisabled();
    });
  });
});
