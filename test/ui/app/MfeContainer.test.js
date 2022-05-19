import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MfeContainer from 'ui/app/MfeContainer';

import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

let mockedLoading = ['example-mfe'];
const mockMfe = LIST_MFE_RESPONSE_OK.find(obj => obj.id === 'example-mfe');

jest.mock('hooks/useMfe', () => jest.fn(() => ([mockedLoading, mockMfe])));

describe('MfeContainer', () => {
  it('Should return loading state', () => {
    render(<MfeContainer id="example-mfe" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should return the micro front-end when loading is complete', () => {
    mockedLoading = [];
    const { container } = render(<MfeContainer id="example-mfe" />);
    expect(container.querySelector('example-mfe')).toBeInTheDocument();
  });

  it('micro front-end should have proper params', () => {
    mockedLoading = [];
    const { container } = render(<MfeContainer id="example-mfe" />);
    const mfe = container.querySelector('example-mfe');
    expect(mfe).toBeInTheDocument();
    expect(mfe.getAttribute('api')).toBe(JSON.stringify(mockMfe.params.api));
  });
});
