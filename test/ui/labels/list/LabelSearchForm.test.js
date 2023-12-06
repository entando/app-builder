import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LabelSearchForm from 'ui/labels/list/LabelSearchForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const handleSubmit = jest.fn();
const onMount = jest.fn();
const onUnmount = jest.fn();

jest.unmock('react-redux');

describe('LabelSearchFormBody', () => {
  let labelSearchForm;

  describe('basic render tests', () => {
    beforeEach(() => {
      labelSearchForm = render(mockRenderWithIntlAndStore(<LabelSearchForm
        onSubmit={handleSubmit}
        onMount={onMount}
        onUnmount={onUnmount}
      />));
    });
    it('root component renders without crashing', () => {
      expect(labelSearchForm).toBeDefined();
    });

    it('root component renders language field', () => {
      expect(labelSearchForm.getByRole('textbox')).toBeDefined();
    });
  });

  describe('event handlers test', () => {
    it('on form submit calls handleSubmit', async () => {
      const onSubmit = jest.fn();
      const form = render(mockRenderWithIntlAndStore(<LabelSearchForm
        onSubmit={onSubmit}
        onMount={onMount}
        onUnmount={onUnmount}
      />));
      const testValue = 'Test Label';
      userEvent.type(form.getByRole('textbox'), testValue);
      fireEvent.click(form.getByText('Search'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({ key: testValue }, 10);
      });
    });
  });
});
