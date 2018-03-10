
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTree from 'ui/pages/common/PageTree';
import { DDTable, gotoRoute } from 'frontend-common-components';
import { ROUTE_PAGE_ADD, ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG } from 'app-init/router';

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
    status: 'published',
    displayedInMenu: false,
    title: 'Services',
    depth: 0,
    isEmpty: true,
    expanded: true,
  },
];

describe('PageTree', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTree pages={PAGES} locale="en" />);
    });
    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });
    it('renders a table row for each page', () => {
      expect(component.find('.PageTree__row')).toHaveLength(PAGES.length);
    });
  });

  describe('drag and drop', () => {
    let component;
    const handleDropIntoPage = jest.fn();
    const handleDropAbovePage = jest.fn();
    const handleDropBelowPage = jest.fn();
    beforeEach(() => {
      component = shallow((
        <PageTree
          pages={PAGES}
          onDropIntoPage={handleDropIntoPage}
          onDropAbovePage={handleDropAbovePage}
          onDropBelowPage={handleDropBelowPage}
        />));
    });
    it('calls onDropIntoPage if a row is dropped with drop type "medium"', () => {
      component.instance().handleDrop(DDTable.DROP_MEDIUM, PAGES[1], PAGES[0]);
      expect(handleDropIntoPage).toHaveBeenCalledWith(PAGES[1].code, PAGES[0].code);
    });
    it('calls onDropAbovePage if a row is dropped with drop type "high"', () => {
      component.instance().handleDrop(DDTable.DROP_HIGH, PAGES[1], PAGES[0]);
      expect(handleDropAbovePage).toHaveBeenCalledWith(PAGES[1].code, PAGES[0].code);
    });
    it('calls onDropBelowPage if a row is dropped with drop type "low"', () => {
      component.instance().handleDrop(DDTable.DROP_LOW, PAGES[1], PAGES[0]);
      expect(handleDropBelowPage).toHaveBeenCalledWith(PAGES[1].code, PAGES[0].code);
    });
    it('calls nothing if a row is dropped with another drop type', () => {
      component.instance().handleDrop(null, PAGES[1], PAGES[0]);
      expect(handleDropIntoPage).not.toHaveBeenCalled();
      expect(handleDropAbovePage).not.toHaveBeenCalled();
      expect(handleDropBelowPage).not.toHaveBeenCalled();
    });
  });

  describe('when expanding a page', () => {
    let component;
    const handleExpandPage = jest.fn();
    beforeEach(() => {
      component = shallow((
        <PageTree
          pages={PAGES}
          onExpandPage={handleExpandPage}
        />));
    });
    it('does not call onExpandPage if the page is empty', () => {
      const emptyPageIndex = 1;
      component.find('.PageTree__icons-label').at(emptyPageIndex)
        .simulate('click', { preventDefault: () => {} });
      expect(PAGES[emptyPageIndex].isEmpty).toBe(true);
      expect(handleExpandPage).not.toHaveBeenCalled();
    });
    it('calls onExpandPage if the page is not empty', () => {
      const notEmptyPageIndex = 0;
      component.find('.PageTree__icons-label').at(notEmptyPageIndex)
        .simulate('click', { preventDefault: () => {} });
      expect(PAGES[notEmptyPageIndex].isEmpty).toBe(false);
      expect(handleExpandPage).toHaveBeenCalled();
    });
  });

  describe('on menu action', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTree pages={PAGES} />);
    });

    describe('add', () => {
      it('redirects to the "add page" route', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickAdd')();
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_PAGE_ADD);
      });
    });

    describe('edit', () => {
      it('redirects to the "edit page" route with pageCode = the page code', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickEdit')();
        expect(gotoRoute)
          .toHaveBeenCalledWith(ROUTE_PAGE_EDIT, { pageCode: PAGES[pageIndex].code });
      });
    });

    describe('config', () => {
      it('redirects to the "config page" route with pageCode = the page code', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickConfigure')();
        expect(gotoRoute)
          .toHaveBeenCalledWith(ROUTE_PAGE_CONFIG, { pageCode: PAGES[pageIndex].code });
      });
    });
  });
});
