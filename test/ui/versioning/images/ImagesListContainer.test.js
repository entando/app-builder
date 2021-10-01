import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from 'react-intl';
import { mockApi } from 'testutils/helpers';
import { screen } from '@testing-library/react';

import { getResourceVersionings } from 'api/versioning';
import { LIST_IMAGES_OK } from 'testutils/mocks/versioning';
import { renderWithRedux, renderWithRouter } from 'testutils/testUtils';

import ImagesListContainer from 'ui/versioning/images/ImagesListContainer';

jest.mock('api/versioning');

describe('Images List Container', () => {
  it('renders container without error', async () => {
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <ImagesListContainer />
        </IntlProvider>,
      ),
    );
    expect(getResourceVersionings).toHaveBeenCalledWith('Image', { page: 1, pageSize: 10 }, '');
  });

  it('renders search form inside container', async () => {
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <ImagesListContainer />
        </IntlProvider>,
      ),
    );
    expect(await screen.findByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('renders image list', async () => {
    getResourceVersionings.mockImplementationOnce(mockApi({ payload: LIST_IMAGES_OK }));
    renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <ImagesListContainer />
        </IntlProvider>,
      ),
    );
    expect(getResourceVersionings).toHaveBeenCalledWith('Image', { page: 1, pageSize: 10 }, '');
    expect(await screen.findByText('Current Page')).toBeInTheDocument();
    expect(screen.getAllByText('Recover')).toHaveLength(LIST_IMAGES_OK.length);
    expect(screen.getAllByText('Remove')).toHaveLength(LIST_IMAGES_OK.length);
    expect(screen.getByText(LIST_IMAGES_OK[0].description)).toBeInTheDocument();

    // list
    LIST_IMAGES_OK.forEach(({
      description,
    }) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
