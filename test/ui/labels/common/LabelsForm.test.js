import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { LANGUAGES_LIST } from 'test/mocks/languages';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();
const LANGUAGES = LANGUAGES_LIST;
const ON_WILL_MOUNT = jest.fn();

jest.unmock('react-redux');
jest.unmock('redux-form');

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
      />));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has class LabelsForm', () => {
      expect(component.exists('LabelsForm')).toBe(true);
    });
  });

  describe('with onWillMount callback', () => {
    beforeEach(() => {
      mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        languages={LANGUAGES}
        onWillMount={ON_WILL_MOUNT}
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
        invalid
      />));
    });
    it('Save button is disabled', () => {
      expect(component.find('.LabelsForm__save-btn').exists('disabled')).toBe(true);
    });
  });
  describe('save button is disabled', () => {
    let component;
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        onWillMount={ON_WILL_MOUNT}
        languages={LANGUAGES}
      />));
    });
    it('Save button is disabled', () => {
      expect(component.find('.LabelsForm__save-btn').exists('disabled')).toBe(true);
    });
  });
  describe('save button is disabled', () => {
    let component;
    const preventDefault = jest.fn();
    beforeEach(() => {
      component = mount(mockRenderWithIntlAndStore(<LabelsForm
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        onWillMount={ON_WILL_MOUNT}
        languages={LANGUAGES}
      />));
    });
    it('on form submit calls handleSubmit', () => {
      component.find('form').simulate('submit', { preventDefault });
      expect(HANDLE_SUBMIT).toHaveBeenCalled();
    });
  });
});
