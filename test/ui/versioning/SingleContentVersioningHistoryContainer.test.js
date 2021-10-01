import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { formatDate } from '@entando/utils';
import { screen, within } from '@testing-library/react';
import { renderWithRedux, renderWithRouter } from 'testutils/testUtils';
import SingleContentVersioningHistoryContainer from 'ui/versioning/SingleContentVersioningHistoryContainer';
import { getSingleVersioning } from 'api/versioning';
import { LIST_SINGLE_VERSIONING_OK } from 'testutils/mocks/versioning';

jest.mock('api/versioning');

describe('Single Content Versioning History Container', () => {
  it('renders table header and data', async () => {
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <SingleContentVersioningHistoryContainer />
        </IntlProvider>,
      ),
    );

    expect(getSingleVersioning).toHaveBeenCalledTimes(1);

    // header
    expect(await screen.findByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/Version/)).toBeInTheDocument();
    expect(screen.getByText(/editor/i)).toBeInTheDocument();
    expect(screen.getByText(/last modified/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();

    // data
    LIST_SINGLE_VERSIONING_OK.forEach(({
      description,
      username,
      version,
      versionDate,
    }) => {
      const rowNode = screen.getByText(description).closest('tr');
      const row = within(rowNode);
      expect(row.getByText(description)).toBeInTheDocument();
      expect(row.getByText(version)).toBeInTheDocument();
      expect(row.getByText(username)).toBeInTheDocument();
      expect(row.getByText(formatDate(versionDate))).toBeInTheDocument();
    });
    expect(screen.getAllByText('Delete version')).toHaveLength(LIST_SINGLE_VERSIONING_OK.length);
    expect(screen.getAllByText('Restore version')).toHaveLength(LIST_SINGLE_VERSIONING_OK.length);
    expect(screen.getAllByText('Details')).toHaveLength(LIST_SINGLE_VERSIONING_OK.length);
  });
});
