import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { screen, within } from '@testing-library/react';
import { renderWithRedux, renderWithRouter } from 'testutils/testUtils';
import VersioningListContainer from 'ui/versioning/VersioningListContainer';
import { getVersionings } from 'api/versioning';
import { getContentTypes } from 'api/contentTypes';
import { LIST_VERSIONING_OK } from 'testutils/mocks/versioning';

jest.mock('api/versioning');
jest.mock('api/contentTypes');

describe('Versioning List Container', () => {
  it('renders table header and data', async () => {
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <VersioningListContainer />
        </IntlProvider>,
      ),
    );

    expect(getVersionings).toHaveBeenCalledTimes(1);
    expect(getContentTypes).toHaveBeenCalledTimes(1);

    // header
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/content type/i)).toBeInTheDocument();
    expect(screen.getByText(/editor/i)).toBeInTheDocument();
    expect(screen.getByText(/last modified/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();

    // data
    LIST_VERSIONING_OK.forEach(({
      description,
      contentId,
      username,
      contentType,
    }) => {
      const rowNode = screen.getByText(contentId).closest('tr');
      const row = within(rowNode);
      expect(row.getByText(description)).toBeInTheDocument();
      expect(row.getByText(contentId)).toBeInTheDocument();
      expect(row.getByText(username)).toBeInTheDocument();
      expect(row.getByText(contentType)).toBeInTheDocument();
    });

    expect(screen.getByText(/1\.6/)).toBeInTheDocument();
    expect(screen.getByText(/2\.2/)).toBeInTheDocument();
    expect(screen.getByText(/1\.0/)).toBeInTheDocument();
    expect(screen.getAllByTitle(/published/i).length).toBe(3);
  });
});
