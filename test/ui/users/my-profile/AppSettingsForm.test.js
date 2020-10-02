import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const props = {
  onDidMount: jest.fn(),
  onSubmit: jest.fn(),
  username: 'test_username',
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AppSettingsForm', () => {
  it('renders without crashing, and display all elements when Wizard is disabled', () => {
    const { getByText, getByLabelText } =
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    expect(getByText('Change your preferences')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
    expect(getByLabelText('Welcome Wizard')).toBeInTheDocument();
  });

  it('Verify onSubmit function is triggered when submititng form', () => {
    const { getByTestId } =
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    fireEvent.submit(getByTestId('appSettingsForm'));
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
