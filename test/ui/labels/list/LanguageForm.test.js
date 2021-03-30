import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import LanguageForm, { renderSelectOptions } from 'ui/labels/list/LanguageForm';

import { LANGUAGES_LIST } from 'test/mocks/languages';

jest.unmock('react-redux');
jest.unmock('redux-form');

const languages = LANGUAGES_LIST.filter(item => !item.isActive)
  .map(item => (
    { value: item.code, text: item.description }
  ));

const handleSubmit = jest.fn();
const onWillMount = jest.fn();

describe('LanguageFormBody', () => {
  let languageForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
    jest.clearAllMocks();
  });
  const buildLanguageForm = () => {
    const props = {
      onWillMount,
      languages,
      submitting,
      invalid,
      handleSubmit,
    };

    return mount(mockRenderWithIntlAndStore(<LanguageForm {...props} />, { modal: {} }));
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      languageForm = buildLanguageForm();
    });
    it('root component renders without crashing', () => {
      expect(languageForm.exists()).toEqual(true);
    });

    it('root component renders language field', () => {
      const language = languageForm.find('.LanguageForm__language-field');
      expect(language.exists()).toEqual(true);
    });

    it('root component renders options for select input', () => {
      const options = renderSelectOptions(languages);
      expect(options.length).toBe(languages.length);
    });
  });

  describe('event handlers test', () => {
    const preventDefault = jest.fn();
    beforeEach(() => {
      languageForm = buildLanguageForm();
    });

    it('on form submit calls handleSubmit', () => {
      languageForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
