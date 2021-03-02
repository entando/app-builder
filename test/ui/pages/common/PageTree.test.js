import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { mockRenderWithIntlDDStoreRouter } from 'test/testUtils';

import PageTree from 'ui/pages/common/PageTree';
import MovePageModalContainer from 'ui/pages/common/MovePageModalContainer';

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

const renderComponent = (addProps = {}) => render(
  mockRenderWithIntlDDStoreRouter(
    <PageTree {...props} {...addProps} />,
    requiredState,
  ),
);

describe('PageTree', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    it('renders without crashing', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.PageTree')).toBeInTheDocument();
    });
    it('renders pages', () => {
      const { container } = renderComponent();
      expect(container.querySelectorAll('tbody tr')).toHaveLength(PAGES.length);
    });
  });

  describe('drag and drop', () => {
    const handleDropPage = jest.fn();

    it('calls onDropPage with action of "dropping"', () => {
      const { container } = renderComponent({ onDropPage: handleDropPage });
      const firstItem = container.querySelector('tbody tr.DDTable__tr');
      const secondItem = container.querySelector('tbody tr.DDTable__tr:nth-child(2)');
      const firstItemHandle = firstItem.querySelector('.PageTree__drag-handle');
      fireEvent.dragStart(firstItemHandle);
      fireEvent.dragOver(secondItem);
      fireEvent.drop(secondItem);
      expect(handleDropPage).toHaveBeenCalledWith(
        PAGES[0].code, PAGES[1].code,
        MovePageModalContainer.INTO_PARENT,
      );
    });
  });

  describe('when expanding a page', () => {
    const handleExpandPage = jest.fn();
    it('does not call onExpandPage if the page is empty', () => {
      const { container } = renderComponent({ onExpandPage: handleExpandPage });
      const expbutton = container.querySelector('tbody tr:nth-child(2) .PageTree__icons-label');
      fireEvent.click(expbutton);
      expect(PAGES[1].isEmpty).toBe(true);
      expect(handleExpandPage).not.toHaveBeenCalled();
    });
    it('calls onExpandPage if the page is not empty', () => {
      const { container } = renderComponent({ onExpandPage: handleExpandPage });
      const expbutton = container.querySelector('tbody tr:nth-child(1) .PageTree__icons-label');
      fireEvent.click(expbutton);
      expect(PAGES[0].isEmpty).toBe(false);
      expect(handleExpandPage).toHaveBeenCalled();
    });
  });

  describe('on menu action', () => {

    describe('add', () => {
      it('redirects to the "add page" route', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-add a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickAdd).toHaveBeenCalled();
      });
    });

    describe('edit', () => {
      it('redirects to the "edit page" route with pageCode = the page code', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-edit a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickEdit).toHaveBeenCalled();
      });
    });

    describe('design', () => {
      it('redirects to the "design page" route with pageCode = the page code', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-configure a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickConfigure).toHaveBeenCalled();
      });
    });

    describe('detail', () => {
      it('redirects to the "config page" route with pageCode = the page code', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-details a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickDetails).toHaveBeenCalled();
      });
    });

    describe('clone', () => {
      it('redirects to the clone Page', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-clone a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickClone).toHaveBeenCalled();
      });
    });

    describe('delete', () => {
      it('open delete Page modal', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(2)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-delete a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickDelete).toHaveBeenCalled();
      });
    });

    describe('publish', () => {
      it('call publish action', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(2)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-publish a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickPublish).toHaveBeenCalled();
      });
    });

    describe('unpublish', () => {
      it('call unpublish action', () => {
        const { container } = renderComponent();
        const rowChosen = container.querySelector('tbody tr:nth-child(1)');
        const rowActionMenu = rowChosen.querySelector('.PageTreeActionMenuButton__menu-item-unpublish a');
        fireEvent.click(rowActionMenu);
        expect(props.onClickUnPublish).toHaveBeenCalled();
      });
    });
  });
});
