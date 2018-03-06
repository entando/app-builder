
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreeSelector from 'ui/pages/common/PageTreeSelector';

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

const ON_CHANGE = jest.fn();
const ON_EXPAND_PAGE = jest.fn();
const SELECTED_INDEX = 1;

describe('PageTreeSelector', () => {
  let component;

  describe('basic rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      component = shallow((
        <PageTreeSelector
          pages={PAGES}
          onExpandPage={ON_EXPAND_PAGE}
          input={{
            onChange: ON_CHANGE,
            value: PAGES[SELECTED_INDEX].code,
          }}
        />
      ));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });
    it('renders one "PageTreeSelector__column-td" per page', () => {
      expect(component.find('.PageTreeSelector__column-td')).toHaveLength(PAGES.length);
    });
    it('sets class "PageTreeSelector__column-td--empty" on empty pages', () => {
      const emptyPageIndex = 1;
      expect(PAGES[emptyPageIndex].isEmpty).toBe(true); // assert page is empty
      const emptyTd = component.find('.PageTreeSelector__column-td').at(emptyPageIndex);
      expect(emptyTd.hasClass('PageTreeSelector__column-td--empty')).toBe(true);
    });
    it('does not set class "PageTreeSelector__column-td--empty" on non-empty pages', () => {
      const nonEmptyPageIndex = 0;
      expect(PAGES[nonEmptyPageIndex].isEmpty).toBe(false); // assert page is non empty
      const emptyTd = component.find('.PageTreeSelector__column-td').at(nonEmptyPageIndex);
      expect(emptyTd.hasClass('PageTreeSelector__column-td--empty')).toBe(false);
    });
    it('sets class "info" on selected page', () => {
      const emptyPageIndex = 1;
      expect(PAGES[emptyPageIndex].isEmpty).toBe(true); // assert page is empty
      const emptyTd = component.find('.PageTreeSelector__column-td').at(emptyPageIndex);
      expect(emptyTd.hasClass('PageTreeSelector__column-td--empty')).toBe(true);
    });
    it('does not set class "info" on non selected page', () => {
      const td = component.find('.PageTreeSelector__column-td').at(SELECTED_INDEX);
      expect(td.hasClass('info')).toBe(true);
    });

    it('when clicking on expand area of an empty page, does not call onExpandPage', () => {
      const emptyPageIndex = 1;
      expect(PAGES[emptyPageIndex].isEmpty).toBe(true); // assert page is empty
      const emptyTd = component.find('.PageTreeSelector__column-td').at(emptyPageIndex);
      emptyTd.find('.PageTreeSelector__expand-area').simulate('click');
      expect(ON_EXPAND_PAGE).not.toHaveBeenCalled();
    });

    it('when clicking on expand area of a non-empty page, calls onExpandPage', () => {
      const nonEmptyPageIndex = 0;
      expect(PAGES[nonEmptyPageIndex].isEmpty).toBe(false); // assert page is non empty
      const emptyTd = component.find('.PageTreeSelector__column-td').at(nonEmptyPageIndex);
      emptyTd.find('.PageTreeSelector__expand-area').simulate('click');
      expect(ON_EXPAND_PAGE).toHaveBeenCalledWith(PAGES[nonEmptyPageIndex].code);
    });

    it('when clicking on select area, calls onChange', () => {
      const pageIndex = 1;
      const td = component.find('.PageTreeSelector__column-td').at(pageIndex);
      td.find('.PageTreeSelector__select-area').simulate('click');
      expect(ON_CHANGE).toHaveBeenCalledWith(PAGES[pageIndex].code);
    });
  });
});
