import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
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
  it('renders without crashing, and display all elements', () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Welcome Wizard')).toBeInTheDocument();
    // TODO getByLabelText is not working withe the following fields
    // expect(screen.getByLabelText('Missing Translation Warning')).toBeInTheDocument();
    // expect(screen.getByLabelText('Load on Page Select')).toBeInTheDocument();
  });

  it('Verify onSubmit function is triggered when submititng form', () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    fireEvent.submit(screen.getByTestId('appSettingsForm'));
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
