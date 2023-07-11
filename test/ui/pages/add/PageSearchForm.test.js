import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl, mockIntl, mockRenderWithRouter } from 'test/legacyTestUtils';

import PageSearchForm, { PageSearchFormBody } from 'ui/pages/list/PageSearchForm';
import { renderWithIntl } from '../../../test/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';


const handleSubmit = jest.fn();
const onSubmit = jest.fn();

describe('PageSearchForm', () => {
  beforeEach(jest.clearAllMocks);

  let pageSearchForm; 

  let submitting;

  beforeEach(() => {
    submitting = false;
  });

  const buildPageSearchForm = () => {
    const props = {
      submitting,
      handleSubmit,
      intl: mockIntl,
    };

    return shallowWithIntl(<PageSearchFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    pageSearchForm = buildPageSearchForm(); 
    expect(pageSearchForm.exists()).toBe(true);
  });

  it('on form submit calls handleSubmit', async () => {
    const props = {
      isSubmitting: false,
      onSubmit,
      handleSubmit,
      intl: mockIntl,
      initialValues: {
        name: 'name',
        code: 'namecode',
      },
    };

    renderWithIntl(mockRenderWithRouter(<PageSearchForm {...props} />));
    const btn = screen.getByRole('button', { name: /search/i });
    await fireEvent.click(btn);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});