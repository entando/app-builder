import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/testUtils';
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

const renderComponent = (addProps = {}) => render(
  mockRenderWithIntlAndStore(
    <PageListSearchTable page={1} pageSize={1} totalItems={1} {...props} {...addProps} />,
    requiredState,
  ),
);

describe('PageListSearchTable', () => {
  describe('without searchPages', () => {
    it('renders without crashing', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.PageListSearchTable')).toBeInTheDocument();
      expect(container.querySelector('.PageListSearchTable__table')).not.toBeInTheDocument();
    });

    it('renders an Alert', () => {
      const { container } = renderComponent();
      const alert = container.querySelector('.alert');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('with searchPages', () => {
    it('has a table', () => {
      const { container } = renderComponent({ searchPages });
      expect(container.querySelectorAll('table')).toHaveLength(1);
    });

    it('has a table header', () => {
      const { container } = renderComponent({ searchPages });
      const thead = container.querySelectorAll('thead');
      expect(thead).toHaveLength(1);
    });

    it('has one row if there is one searchPage ', () => {
      const { container } = renderComponent({ searchPages });
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
      const tr = tbody.querySelector('tr');
      expect(tbody.querySelector('tr')).toBeInTheDocument();
      expect(tr.querySelector('.dropdown.dropdown-kebab-pf')).toBeInTheDocument();
    });

    it('has a menu in the action column of each row', () => {
      const { container } = renderComponent({ searchPages });
      container.querySelectorAll('tbody tr').forEach((tr) => {
        expect(tr.querySelector('.dropdown.dropdown-kebab-pf')).toBeInTheDocument();
      });
    });

    it('has a paginator', () => {
      const { container } = renderComponent({ searchPages });
      expect(container.querySelector('.table-view-pf-pagination')).toBeInTheDocument();
    });
  });
});
