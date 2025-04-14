import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { LANGUAGES_LIST } from 'test/mocks/languages';

const ON_SUBMIT = jest.fn();
const LANGUAGES = LANGUAGES_LIST;
const ON_DID_MOUNT = jest.fn();

jest.unmock('react-redux');

describe('LabelsForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    beforeEach(() => {
      render(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        languages={LANGUAGES}
        onDidMount={ON_DID_MOUNT}
      />));
    });

    it('renders form without crashing', () => {
      expect(screen.getByTestId('common_LabelsForm_Form')).toBeInTheDocument();
    });
  });

  describe('with onDidMount callback', () => {
    beforeEach(() => {
      render(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        languages={LANGUAGES}
        onDidMount={ON_DID_MOUNT}
      />));
    });

    it('calls onDidMount', () => {
      expect(ON_DID_MOUNT).toHaveBeenCalled();
    });
  });
  describe('save button is disabled', () => {
    beforeEach(() => {
      render(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        languages={LANGUAGES}
        onDidMount={ON_DID_MOUNT}
      />));
    });
    it('Save button is disabled', () => {
      expect(screen.getByTestId('common_LabelsForm_Button')).toBeDisabled();
    });
  });
});
