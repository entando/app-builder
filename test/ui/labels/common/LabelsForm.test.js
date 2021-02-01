import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import { LabelsFormBody as LabelsForm } from 'ui/labels/common/LabelsForm';
import { LANGUAGES_LIST } from 'test/mocks/languages';
import { mockRenderWithIntlAndStore, mockIntl } from 'test/testUtils';

const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();
const LANGUAGES = LANGUAGES_LIST;
const ON_WILL_MOUNT = jest.fn();

jest.unmock('react-redux');

describe('LabelsForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        languages={LANGUAGES}
        onWillMount={ON_WILL_MOUNT}
        intl={mockIntl}
      />));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has class LabelsForm', () => {
      expect(component.exists('.LabelsForm')).toBe(true);
    });
  });

  describe('with onWillMount callback', () => {
    beforeEach(() => {
      mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        languages={LANGUAGES}
        onWillMount={ON_WILL_MOUNT}
        intl={mockIntl}
      />));
    });

    it('calls onWillMount', () => {
      expect(ON_WILL_MOUNT).toHaveBeenCalled();
    });
  });
  describe('save button is disabled', () => {
    let component;
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        languages={LANGUAGES}
        onWillMount={ON_WILL_MOUNT}
        intl={mockIntl}
        invalid
      />));
    });
    it('Save button is disabled', () => {
      expect(component.find('button.LabelsForm__save-btn')).toBeDisabled();
    });
  });
  describe('save button submit', () => {
    let component;
    const preventDefault = jest.fn();
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        onWillMount={ON_WILL_MOUNT}
        languages={LANGUAGES}
        intl={mockIntl}
      />));
    });
    it('on form submit calls handleSubmit', () => {
      component.find('form').simulate('submit', { preventDefault });
      expect(HANDLE_SUBMIT).toHaveBeenCalled();
    });
  });
});
