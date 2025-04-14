import React from 'react';
import 'test/enzyme-init';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';
import { mockIntl, mockRenderWithRouter } from 'test/legacyTestUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../../../test/testUtils';

const onSubmit = jest.fn();

describe('FragmentSearchForm', () => {
  let fragmentSearchForm;

  const buildFragmentSearchForm = () => {
    const props = {
      onSubmit,
      intl: mockIntl,
    };

    return renderWithIntl(mockRenderWithRouter(<FragmentSearchForm {...props} />));
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      fragmentSearchForm = buildFragmentSearchForm();
    });
    it('root component renders without crashing', () => {
      expect(fragmentSearchForm).toBeDefined();
    });

    it('root component renders code field', () => {
      const codeInput = screen.getByRole('textbox', { name: /code/i });
      expect(codeInput).toBeDefined();
    });

    it('root component renders widgetType field', () => {
      const widgetType = screen.getByPlaceholderText(/Widget Type/i);
      expect(widgetType).toBeDefined();
    });
    it('root component renders plugin Field', () => {
      const plugin = screen.getByPlaceholderText(/plugin/i);
      expect(plugin).toBeDefined();
    });
  });

  it('on form submit calls handleSubmit', async () => {
    const props = {
      isSubmitting: false,
      onSubmit,
      intl: mockIntl,
      initialValues: {
        code: '', widgetType: '', pluginCode: '',
      },
    };

    renderWithIntl(mockRenderWithRouter(<FragmentSearchForm {...props} />));
    const btn = screen.getByRole('button', { name: /search/i });
    await fireEvent.click(btn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
