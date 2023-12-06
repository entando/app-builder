import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { withFormik } from 'formik';

import { PasswordFormBody } from 'ui/users/my-profile/AccountForm';
import { IntlProvider } from 'react-intl';

describe('PasswordFormBody', () => {
  let container;
  beforeEach(() => {
    const PasswordFormBodyWithFormik =
    withFormik({ mapPropsToValues: () => {}, onSubmit: () => {} })(PasswordFormBody);
    const { container: rtlContainer } = render(<IntlProvider locale="en"><PasswordFormBodyWithFormik /></IntlProvider>);
    container = rtlContainer;
  });

  it('renders without crashing', async () => {
    expect(within(screen.getByRole('form'))).toBeDefined();
  });

  it('has a oldPassword text field', () => {
    const inputElement = container.querySelector('#oldPassword');
    expect(inputElement).toBeDefined();
  });

  it('has a newPassword text field', () => {
    const inputElement = container.querySelector('#newPassword');
    expect(inputElement).toBeDefined();
  });

  it('has a newPasswordConfirm text field', () => {
    const inputElement = container.querySelector('#oldPasswordConfirm');
    expect(inputElement).toBeDefined();
  });
});
