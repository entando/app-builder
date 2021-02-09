import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, within } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const props = {
  onDidMount: jest.fn(),
  onSubmit: jest.fn(),
  username: 'test_username',
  selectGroups: [{
    value: 'admin',
    text: 'Administrators',
  }, {
    value: 'free',
    text: 'Free Access',
  }],
  selectedJoinGroups: ['free'],
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AppSettingsForm', () => {
  it('renders without crashing, and display all elements', () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    const defaultOwnerGroupSelectView = within(screen.getByRole('combobox', { name: 'Default Owner Group' }));
    const defaultJoinGroupsMultiSelectView = within(screen.getByTestId('multi-select'));
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByLabelText('Welcome Wizard')).toBeInTheDocument();
    expect(screen.getByLabelText('Missing Translation Warning')).toBeInTheDocument();
    expect(screen.getByLabelText('Load on Page Select')).toBeInTheDocument();
    expect(screen.getByLabelText('Display attributes')).toBeInTheDocument();
    expect(defaultOwnerGroupSelectView.getByRole('option', { name: 'Administrators' })).toBeInTheDocument();
    expect(defaultOwnerGroupSelectView.getByRole('option', { name: 'Free Access' })).toBeInTheDocument();
    expect(defaultJoinGroupsMultiSelectView.getByRole('option', { name: 'Administrators' })).toBeInTheDocument();
  });

  it('Verify onSubmit function is triggered when submitting form', () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    fireEvent.submit(screen.getByTestId('appSettingsForm'));
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
