import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  configEnzymeAdapter,
  mockApi,
} from 'testutils/helpers';
import '@testing-library/jest-dom/extend-expect';
import { formatDate } from '@entando/utils';
import { screen, within } from '@testing-library/react';
import { renderWithRedux, renderWithRouter } from 'testutils/testUtils';
import SingleContentCurrentVersionContainer from 'ui/versioning/SingleContentCurrentVersionContainer';
import { getContent } from 'api/editContent';
import { getMyGroups } from 'api/groups';
import { GET_CONTENT_RESPONSE_OK } from 'testutils/mocks/editContent';

jest.mock('api/editContent');
jest.mock('api/groups', () => ({
  getMyGroups: jest.fn(mockApi({ payload: [] })),
}));

configEnzymeAdapter();

describe('Single Content Current Version Container Test', () => {
  it('renders table header and data', async () => {
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <SingleContentCurrentVersionContainer />
        </IntlProvider>,
      ),
    );

    expect(getContent).toHaveBeenCalledTimes(1);
    expect(getMyGroups).toHaveBeenCalledTimes(1);

    // header
    expect(await screen.findByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/author/i)).toBeInTheDocument();
    expect(screen.getByText(/version/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/owner group/i)).toBeInTheDocument();
    expect(screen.getByText(/view-only groups/i)).toBeInTheDocument();

    // data
    const {
      description, lastModified, lastEditor, version,
    } = GET_CONTENT_RESPONSE_OK;
    const rowNode = screen.getByText(description).closest('tr');
    const row = within(rowNode);
    expect(row.getByText(description)).toBeInTheDocument();
    expect(row.getByText(version)).toBeInTheDocument();
    expect(row.getByText(lastEditor)).toBeInTheDocument();
    expect(row.getByText(formatDate(lastModified))).toBeInTheDocument();
  });
});
