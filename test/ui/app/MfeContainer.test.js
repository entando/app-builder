import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';

import MfeContainer from 'ui/app/MfeContainer';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let mockedLoading = ['example-mfe'];
const mockMfe = LIST_MFE_RESPONSE_OK.find(obj => obj.id === 'example-mfe');

const mfeConfigMock = {
  api: mockMfe.api,
  userPermissions: ['superuser', 'viewUsers'],
  lang: 'en',
};

jest.mock('hooks/useMfe', () => jest.fn(() => ([mockedLoading, mockMfe])));

jest.mock('state/system/selectors', () => ({
  getSystemReport: jest.fn().mockReturnValue({
    contentSchedulerPluginInstalled: true,
  }),
}));

describe('MfeContainer', () => {
  beforeAll(() => {
    useSelector.mockImplementation(callback => callback({
      locale: mfeConfigMock.lang,
      permissions: {
        loggedUser: [...mfeConfigMock.userPermissions],
      },
    }));
  });

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
    expect(mfe.getAttribute('config')).toBe(JSON.stringify({ api: mfeConfigMock.api }));
  });
});
