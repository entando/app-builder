import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MfeContainer from 'ui/app/MfeContainer';

import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';
import { MemoryRouter } from 'react-router-dom';

let mockedLoading = ['example-mfe'];
const mockMfe = LIST_MFE_RESPONSE_OK.find(obj => obj.id === 'example-mfe');

const mfeConfigMock = {
  api: mockMfe.api,
};

jest.mock('hooks/useMfe', () => jest.fn(() => ([mockedLoading, mockMfe])));

describe('MfeContainer', () => {
  it('Should return loading state', () => {
    render(<MemoryRouter><MfeContainer id="example-mfe" /></MemoryRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should return the micro front-end when loading is complete', () => {
    mockedLoading = [];
    const { container } = render(<MemoryRouter><MfeContainer id="example-mfe" /></MemoryRouter>);
    expect(container.querySelector('example-mfe')).toBeInTheDocument();
  });

  it('micro front-end should have proper params', () => {
    mockedLoading = [];
    const { container } = render(<MemoryRouter><MfeContainer id="example-mfe" /></MemoryRouter>);
    const mfe = container.querySelector('example-mfe');
    expect(mfe).toBeInTheDocument();
    expect(mfe.getAttribute('config')).toBe(JSON.stringify(mfeConfigMock));
  });
});
