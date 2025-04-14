import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import LanguageForm, { renderSelectOptions } from 'ui/labels/list/LanguageForm';

import { LANGUAGES_LIST } from 'test/mocks/languages';

const languages = LANGUAGES_LIST.filter(item => !item.isActive)
  .map(item => (
    { value: item.code, text: item.description }
  ));

jest.unmock('react-redux');

const onSubmit = jest.fn();

describe('LanguageFormBody', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const buildLanguageForm = () => {
    const props = {
      onSubmit,
      languages,
    };
    render(mockRenderWithIntlAndStore(
      <LanguageForm {...props} />,
      { modal: { visibleModal: '', info: {} } },
    ));
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      buildLanguageForm();
    });
    it('root component renders without crashing', () => {
      expect(screen.getByTestId('list_LanguageForm_Form')).toBeInTheDocument();
    });

    it('root component renders language field', () => {
      expect(screen.getByTestId('list_LanguageForm_Field')).toBeInTheDocument();
    });

    it('root component renders options for select input', () => {
      const options = renderSelectOptions(languages);
      expect(options.length).toBe(languages.length);
    });
  });

  describe('event handlers test', () => {
    beforeEach(() => {
      buildLanguageForm();
    });

    it('on form submit calls handleSubmit', async () => {
      userEvent.selectOptions(screen.getByTestId('list_LanguageForm_Field'), 'nl');
      userEvent.click(screen.getByTestId('list_LanguageForm_Button'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
});
