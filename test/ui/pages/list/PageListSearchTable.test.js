import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, within, cleanup } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { SEARCH_PAGES } from 'test/mocks/pages';
import PageListSearchTable from 'ui/pages/list/PageListSearchTable';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';

const searchPages = SEARCH_PAGES;

const eventMocks = {
  onClickAdd: jest.fn(),
  onClickEdit: jest.fn(),
  onClickConfigure: jest.fn(),
  onClickClone: jest.fn(),
  onClickDelete: jest.fn(),
  onClickDetails: jest.fn(),
  onClickPublish: jest.fn(),
  onClickUnPublish: jest.fn(),
};

const props = {
  locale: 'en',
  rowAction: {
    Header: 'Actions',
    attributes: { className: 'text-center' },
    Cell: (cellinfo) => {
      const { original: page } = cellinfo;
      return (
        <PageTreeActionMenu
          {...eventMocks}
          page={page}
          locale="en"
        />
      );
    },
  },
};

jest.unmock('react-redux');

const requiredState = {
  modal: { info: {}, visibleModal: '' },
  pages: { map: {} },
};

const renderComponent = (addProps = {}) => render(mockRenderWithIntlAndStore(
  <PageListSearchTable page={1} pageSize={1} totalItems={1} {...props} {...addProps} />,
  requiredState,
));

afterEach(cleanup);

describe('PageListSearchTable', () => {
  describe('without searchPages', () => {
    it('renders without crashing', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeTruthy();
    });

    it('renders an Alert', () => {
      renderComponent();
      const alert = screen.getByText('No pages found.');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('with searchPages', () => {
    it('has a table', () => {
      renderComponent({ searchPages });
      expect(screen.queryByRole('table')).toBeInTheDocument();
    });

    it('has a table header', () => {
      renderComponent({ searchPages });
      const [thead] = screen.queryAllByRole('rowgroup');
      expect(thead).toBeTruthy();
    });

    it('has one row if there is one searchPage ', () => {
      renderComponent({ searchPages });
      const [, tbody] = screen.queryAllByRole('rowgroup');
      expect(tbody).toBeInTheDocument();
      const tr = within(tbody).queryByRole('row');
      expect(tr).toBeInTheDocument();
      expect(within(tr).queryByRole('menu')).toBeInTheDocument();
    });

    it('has a menu in the action column of each row', () => {
      renderComponent({ searchPages });
      const [, tbody] = screen.queryAllByRole('rowgroup');
      within(tbody).queryAllByRole('row').forEach((tr) => {
        expect(within(tr).queryByRole('menu')).toBeInTheDocument();
      });
    });

    it('has a paginator', () => {
      renderComponent({ searchPages });
      expect(screen.getByText('per page')).toBeInTheDocument();
    });
  });
});
