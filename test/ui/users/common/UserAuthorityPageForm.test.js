import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const props = {
  onAddNewClicked: jest.fn(),
  onCloseModal: jest.fn(),
  loading: false,
  onDidMount: jest.fn(),
  initialValues: { groupRolesCombo: [] },
};

jest.unmock('react-redux');

describe('UserAuthorityPageForm', () => {
  const renderForm = (initialValues = props.initialValues, addProps = {}) => {
    const formProps = { ...props, ...addProps, initialValues };
    render(mockRenderWithIntlAndStore(
      <UserAuthorityPageForm {...formProps} />,
      { modal: { visibleModal: '', info: {} } },
    ));
  };
  beforeEach(() => {
    renderForm();
  });

  it('has class PageTemplateForm', () => {
    expect(screen.getByTestId('common_UserAuthorityPageForm_Form')).toBeInTheDocument();
  });

  it('calls onDidMount', () => {
    expect(props.onDidMount).toHaveBeenCalled();
  });
});

