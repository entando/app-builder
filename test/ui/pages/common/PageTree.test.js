import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, within, fireEvent, cleanup } from '@testing-library/react';
import { mockRenderWithIntlDDStoreRouter } from 'test/legacyTestUtils';

import PageTree from 'ui/pages/common/PageTree';
import { PAGE_MOVEMENT_OPTIONS } from 'state/pages/const';

const PAGES = [
  {
    code: 'homepage',
    status: 'published',
    displayedInMenu: true,
    title: 'Homepage',
    depth: 0,
    isEmpty: false,
    expanded: true,
  },
  {
    code: 'services',
    status: 'unpublished',
    displayedInMenu: false,
    title: 'Services',
    depth: 0,
    isEmpty: true,
    expanded: true,
  },
];

const props = {
  onClickAdd: jest.fn(),
  onClickEdit: jest.fn(),
  onClickConfigure: jest.fn(),
  onClickDelete: jest.fn(),
  onClickDetails: jest.fn(),
  onClickClone: jest.fn(),
  onClickPublish: jest.fn(),
  onClickUnPublish: jest.fn(),
  onClickViewPublishedPage: jest.fn(),
  onClickPreview: jest.fn(),
  domain: '',
  loading: false,
  pages: PAGES,
  locale: 'en',
};

jest.unmock('react-redux');

const requiredState = {
  modal: { info: {}, visibleModal: '' },
  pages: { map: {} },
};

const renderComponent = (addProps = {}) => render(mockRenderWithIntlDDStoreRouter(
  <PageTree {...props} {...addProps} />,
  requiredState,
));

describe('PageTree', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  describe('basic rendering', () => {
    beforeEach(renderComponent);

    it('renders without crashing', () => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
    it('renders pages', () => {
      const resultSet = within(screen.queryAllByRole('rowgroup')[1]);
      const rows = resultSet.getAllByRole('row');
      expect(rows).toHaveLength(PAGES.length);
    });
  });

  describe('drag and drop', () => {
    const handleDropPage = jest.fn();

    it('calls onDropPage with action of "dropping"', () => {
      renderComponent({ onDropPage: handleDropPage });
      const firstItem = screen.getByText(PAGES[0].title).closest('tr');
      const secondItem = screen.getByText(PAGES[1].title).closest('tr');
      const firstItemHandle = firstItem.querySelector('button');
      fireEvent.dragStart(firstItemHandle);
      fireEvent.dragOver(secondItem);
      fireEvent.drop(secondItem);
      expect(handleDropPage).toHaveBeenCalledWith(
        PAGES[0].code, PAGES[1].code,
        PAGE_MOVEMENT_OPTIONS.INTO_PARENT,
      );
    });
  });

  describe('when expanding a page', () => {
    const handleExpandPage = jest.fn();
    it('does not call onExpandPage if the page is empty', () => {
      renderComponent({ onExpandPage: handleExpandPage });
      const expbutton = screen.getByText(PAGES[1].title).closest('[role=button]');
      fireEvent.click(expbutton);
      expect(PAGES[1].isEmpty).toBe(true);
      expect(handleExpandPage).not.toHaveBeenCalled();
    });
    it('calls onExpandPage if the page is not empty', () => {
      renderComponent({ onExpandPage: handleExpandPage });
      const expbutton = screen.getByText(PAGES[0].title).closest('[role=button]');
      fireEvent.click(expbutton);
      expect(PAGES[0].isEmpty).toBe(false);
      expect(handleExpandPage).toHaveBeenCalled();
    });
  });

  describe('on menu action', () => {
    beforeEach(renderComponent);

    describe('add', () => {
      it('redirects to the "add page" route', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Add');
        fireEvent.click(rowActionMenu);
        expect(props.onClickAdd).toHaveBeenCalled();
      });
    });

    describe('edit', () => {
      it('redirects to the "edit page" route with pageCode = the page code', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Edit');
        fireEvent.click(rowActionMenu);
        expect(props.onClickEdit).toHaveBeenCalled();
      });
    });

    describe('design', () => {
      it('redirects to the "design page" route with pageCode = the page code', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Design');
        fireEvent.click(rowActionMenu);
        expect(props.onClickConfigure).toHaveBeenCalled();
      });
    });

    describe('detail', () => {
      it('redirects to the "config page" route with pageCode = the page code', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Details');
        fireEvent.click(rowActionMenu);
        expect(props.onClickDetails).toHaveBeenCalled();
      });
    });

    describe('clone', () => {
      it('redirects to the clone Page', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Clone');
        fireEvent.click(rowActionMenu);
        expect(props.onClickClone).toHaveBeenCalled();
      });
    });

    describe('delete', () => {
      it('open delete Page modal', () => {
        const rowChosen = within(screen.getByText(PAGES[1].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Delete');
        fireEvent.click(rowActionMenu);
        expect(props.onClickDelete).toHaveBeenCalled();
      });
    });

    describe('publish', () => {
      it('call publish action', () => {
        const rowChosen = within(screen.getByText(PAGES[1].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Publish');
        fireEvent.click(rowActionMenu);
        expect(props.onClickPublish).toHaveBeenCalled();
      });
    });

    describe('unpublish', () => {
      it('call unpublish action', () => {
        const rowChosen = within(screen.getByText(PAGES[0].title).closest('tr'));
        const rowActionMenu = within(rowChosen.getByRole('menu')).getByText('Unpublish');
        fireEvent.click(rowActionMenu);
        expect(props.onClickUnPublish).toHaveBeenCalled();
      });
    });
  });
});
