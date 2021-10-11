import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux, renderWithRouterProvider } from 'test/testUtils';
import AttachmentsList from 'ui/versioning/attachments/AttachmentsList';
import { LIST_ATTACHMENTS_OK } from 'test/mocks/versioning';

jest.unmock('react-redux');

const STARTING_PROPS = {
  attachments: LIST_ATTACHMENTS_OK,
};

describe('AttachmentsList', () => {
  it('renders without crash with attachments and actions', () => {
    renderWithRedux(
      renderWithRouterProvider(
        <IntlProvider locale="en">
          <AttachmentsList {...STARTING_PROPS} />
        </IntlProvider>,
      ),
    );

    expect(screen.getAllByText('Recover')).toHaveLength(LIST_ATTACHMENTS_OK.length);
    expect(screen.getAllByText('Remove')).toHaveLength(LIST_ATTACHMENTS_OK.length);
    expect(screen.getByTitle(LIST_ATTACHMENTS_OK[0].description)).toBeInTheDocument();
    expect(screen.getByText(LIST_ATTACHMENTS_OK[0].lastVersion)).toBeInTheDocument();
    expect(screen.getByText(LIST_ATTACHMENTS_OK[0].fileName)).toBeInTheDocument();
  });

  describe('renders correct file sizes', () => {
    it('in Bs', () => {
      renderWithRedux(
        renderWithRouterProvider(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[0]]} />
          </IntlProvider>,
        ),
      );

      expect(screen.getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[0].size}`);
    });

    it('in KBs', () => {
      renderWithRedux(
        renderWithRouterProvider(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[1]]} />
          </IntlProvider>,
        ),
      );

      expect(screen.getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[1].size}`);
    });

    it('in MBs', () => {
      renderWithRedux(
        renderWithRouterProvider(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[2]]} />
          </IntlProvider>,
        ),
      );

      expect(screen.getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[2].size}`);
    });

    it('in GBs', () => {
      renderWithRedux(
        renderWithRouterProvider(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[3]]} />
          </IntlProvider>,
        ),
      );

      expect(screen.getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[3].size}`);
    });

    it('in TBs', () => {
      renderWithRedux(
        renderWithRouterProvider(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[4]]} />
          </IntlProvider>,
        ),
      );

      expect(screen.getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[4].size}`);
    });
  });
});
