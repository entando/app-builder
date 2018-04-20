
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTree from 'ui/pages/common/PageTree';
import { gotoRoute } from '@entando/router';
import { DDTable } from 'frontend-common-components';


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

const props = {
  onClickAdd: jest.fn(),
  onClickEdit: jest.fn(),
  onClickConfigure: jest.fn(),
  onClickDelete: jest.fn(),
  onClickDetails: jest.fn(),
  onClickClone: jest.fn(),
  onClickPublish: jest.fn(),
  onClickUnPublish: jest.fn(),
};

describe('PageTree', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTree pages={PAGES} locale="en" {...props} />);
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
          {...props}
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
          {...props}
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
      component = shallow(<PageTree pages={PAGES} {...props} />);
    });

    describe('add', () => {
      it('redirects to the "add page" route', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickAdd')();
        expect(props.onClickAdd).toHaveBeenCalled();
      });
    });

    describe('edit', () => {
      it('redirects to the "edit page" route with pageCode = the page code', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickEdit')();
        expect(props.onClickEdit).toHaveBeenCalled();
      });
    });

    describe('config', () => {
      it('redirects to the "config page" route with pageCode = the page code', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickConfigure')();
        expect(props.onClickConfigure).toHaveBeenCalled();
      });
    });

    describe('detail', () => {
      it('redirects to the "config page" route with pageCode = the page code', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickDetails')();
        expect(props.onClickDetails).toHaveBeenCalled();
      });
    });

    describe('clone', () => {
      it('redirects to the clone Page', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickClone')();
        expect(props.onClickClone).toHaveBeenCalled();
      });
    });

    describe('delete', () => {
      it('open delete Page modal', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickDelete')();
        expect(props.onClickDelete).toHaveBeenCalled();
      });
    });

    describe('publish', () => {
      it('call publish action', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickPublish')();
        expect(props.onClickPublish).toHaveBeenCalled();
      });
    });

    describe('unpublish', () => {
      it('call unpublish action', () => {
        const pageIndex = 1;
        component.find('PageTreeActionMenu').at(pageIndex).prop('onClickUnpublish')();
        expect(props.onClickUnPublish).toHaveBeenCalled();
      });
    });
  });
});
