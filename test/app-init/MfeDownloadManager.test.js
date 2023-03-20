import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MfeDownloadManager from 'app-init/MfeDownloadManager';
import { renderWithState } from 'test/testUtils';
import { fetchMfeConfigList } from 'state/mfe/actions';
import { selectIsPrimaryTenant } from 'state/multi-tenancy/selectors';

jest.unmock('react-redux');

jest.mock('state/mfe/actions', () => ({
  fetchMfeConfigList: jest.fn(),
}));

jest.mock('state/multi-tenancy/selectors', () => ({
  selectIsPrimaryTenant: jest.fn(),
}));

describe('MfeDownloadManager', () => {
  beforeEach(() => {
    selectIsPrimaryTenant.mockReturnValue(true);
  });

  it('shows spinner when loading', () => {
    renderWithState(<MfeDownloadManager>test</MfeDownloadManager>, { state: { currentUser: {} } });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows startup wait screen when polling', async () => {
    fetchMfeConfigList.mockImplementationOnce(() => () => new Promise(resolve => resolve({})));

    renderWithState(<MfeDownloadManager>test</MfeDownloadManager>);

    expect(await screen.findByTestId('startup-wait-screen')).toBeInTheDocument();
  });

  it('shows children when ready', async () => {
    fetchMfeConfigList.mockImplementationOnce(() => () =>
      new Promise(resolve => resolve({ payload: [{ descriptorExt: { slot: 'primary-menu' } }], length: 1 })));

    renderWithState(<MfeDownloadManager>test</MfeDownloadManager>);

    expect(await screen.findByText('test')).toBeInTheDocument();
  });

  it('shows startup wait screen when fetching fails', async () => {
    fetchMfeConfigList.mockImplementationOnce(() => () =>
      new Promise((resolve, reject) => reject()));

    renderWithState(<MfeDownloadManager>test</MfeDownloadManager>);

    expect(await screen.findByTestId('startup-wait-screen')).toBeInTheDocument();
  });
});
