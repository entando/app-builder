/**
* @jest-environment jest-environment-jsdom-sixteen
* */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, within } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

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
  defaultPageJoinGroups: ['free'],
  defaultContentJoinGroups: ['admin'],
  values: {},
  initialValues: {},
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AppSettingsForm', () => {
  it('renders without crashing, and display all elements', () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    /* renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <AppSettingsForm {...props} />
        </IntlProvider>,
      ),
    ); */
    const defaultPageOwnerGroupSelectView = within(screen.getAllByRole('combobox')[0]);
    const defaultPageJoinGroupsMultiSelectView = within(screen.getAllByTestId('formik-field_MultiSelectRenderer_select')[0]);
    const defaultContentOwnerGroupSelectView = within(screen.getAllByRole('combobox')[0]);
    const defaultContentJoinGroupsMultiSelectView = within(screen.getAllByTestId('formik-field_MultiSelectRenderer_select')[1]);
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByLabelText('Welcome Wizard')).toBeInTheDocument();
    expect(screen.getByLabelText('Missing Translation Warning')).toBeInTheDocument();
    expect(screen.getByLabelText('Load on Page Select')).toBeInTheDocument();
    expect(defaultPageOwnerGroupSelectView.getByRole('option', { name: 'Administrators' })).toBeInTheDocument();
    expect(defaultPageOwnerGroupSelectView.getByRole('option', { name: 'Free Access' })).toBeInTheDocument();
    expect(defaultPageJoinGroupsMultiSelectView.getByRole('option', { name: 'Administrators' })).toBeInTheDocument();
    expect(defaultContentOwnerGroupSelectView.getByRole('option', { name: 'Administrators' })).toBeInTheDocument();
    expect(defaultContentOwnerGroupSelectView.getByRole('option', { name: 'Free Access' })).toBeInTheDocument();
    expect(defaultContentJoinGroupsMultiSelectView.getByRole('option', { name: 'Free Access' })).toBeInTheDocument();
  });

  it('Verify onSubmit function is triggered when submitting form', async () => {
    render(mockRenderWithIntlAndStore(<AppSettingsForm {...props} />));
    fireEvent.submit(screen.getByTestId('my-profile_AppSettingsForm_FormikForm'));
    await waitFor(() =>
      expect(props.onSubmit).toHaveBeenCalled());
  });
});
