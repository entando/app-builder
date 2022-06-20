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

const EXAMPLE_MFE_ID = 'example-mfe';
let mockedLoading = true;

const mockMfe = LIST_MFE_RESPONSE_OK.find(obj => obj.id === EXAMPLE_MFE_ID);

const mfeConfigMock = {
  api: mockMfe.config.api,
  userPermissions: ['superuser', 'viewUsers'],
  lang: 'en',
};

jest.mock('hooks/useMfe', () => jest.fn(() => ({ assetLoading: mockedLoading, mfe: mockMfe })));

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
    render(<MemoryRouter><MfeContainer id={EXAMPLE_MFE_ID} /></MemoryRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should return the micro front-end when loading is complete', () => {
    mockedLoading = false;
    const { container } = render(<MemoryRouter><MfeContainer id={EXAMPLE_MFE_ID} /></MemoryRouter>);
    expect(container.querySelector(EXAMPLE_MFE_ID)).toBeInTheDocument();
  });

  it('micro front-end should have proper params', () => {
    mockedLoading = false;
    const { container } = render(<MemoryRouter><MfeContainer id={EXAMPLE_MFE_ID} /></MemoryRouter>);
    const mfe = container.querySelector(EXAMPLE_MFE_ID);
    expect(mfe).toBeInTheDocument();
    expect(mfe.getAttribute('config')).toBe(JSON.stringify({ api: mfeConfigMock.api }));
  });
});
