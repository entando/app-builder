import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import LabelSearchForm from 'ui/labels/list/LabelSearchForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const handleSubmit = jest.fn();
const onMount = jest.fn();
const onUnmount = jest.fn();

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('LabelSearchFormBody', () => {
  let labelSearchForm;

  describe('basic render tests', () => {
    beforeEach(() => {
      labelSearchForm = mount(mockRenderWithIntlAndStore(<LabelSearchForm
        handleSubmit={handleSubmit}
        onMount={onMount}
        onUnmount={onUnmount}
      />));
    });
    it('root component renders without crashing', () => {
      expect(labelSearchForm.exists()).toEqual(true);
    });

    it('root component renders language field', () => {
      const text = labelSearchForm.find('.LabelSearchForm__text-field');
      expect(text.exists()).toEqual(true);
    });
  });

  describe('event handlers test', () => {
    const preventDefault = jest.fn();
    beforeEach(() => {
      labelSearchForm = mount(mockRenderWithIntlAndStore(<LabelSearchForm
        handleSubmit={handleSubmit}
        onMount={onMount}
        onUnmount={onUnmount}
      />));
    });

    it('on form submit calls handleSubmit', () => {
      labelSearchForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
