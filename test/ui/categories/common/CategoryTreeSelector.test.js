import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import CategoryTreeSelector from 'ui/categories/common/CategoryTreeSelector';

const CATEGORIES = [
  {
    code: 'home',
    title: 'All',
    depth: 0,
    isEmpty: false,
    expanded: true,
  },
  {
    code: 'mycategory1',
    title: 'My Category 1',
    depth: 1,
    isEmpty: true,
    expanded: true,
  },
];

const ON_CHANGE = jest.fn();
const ON_EXPAND_CATEGORY = jest.fn();
const SELECTED_INDEX = 1;

describe('CategoryTreeSelector', () => {
  let component;

  describe('basic rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      component = shallow((
        <CategoryTreeSelector
          categories={CATEGORIES}
          onExpandCategory={ON_EXPAND_CATEGORY}
          input={{
            onChange: ON_CHANGE,
            value: CATEGORIES[SELECTED_INDEX].code,
          }}
        />
      ));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });
    it('renders one "CategoryTreeSelector__column-td" per category', () => {
      expect(component.find('.CategoryTreeSelector__column-td')).toHaveLength(CATEGORIES.length);
    });
    it('sets class "CategoryTreeSelector__column-td--empty" on empty categories', () => {
      const emptyCategoryIndex = 1;
      expect(CATEGORIES[emptyCategoryIndex].isEmpty).toBe(true); // assert category is empty
      const emptyTd = component.find('.CategoryTreeSelector__column-td').at(emptyCategoryIndex);
      expect(emptyTd.hasClass('CategoryTreeSelector__column-td--empty')).toBe(true);
    });
    it('does not set class "CategoryTreeSelector__column-td--empty" on non-empty categories', () => {
      const nonEmptyCategoryIndex = 0;
      expect(CATEGORIES[nonEmptyCategoryIndex].isEmpty).toBe(false); // assert category is non empty
      const emptyTd = component.find('.CategoryTreeSelector__column-td').at(nonEmptyCategoryIndex);
      expect(emptyTd.hasClass('CategoryTreeSelector__column-td--empty')).toBe(false);
    });
    it('sets class "info" on selected category', () => {
      const emptyCategoryIndex = 1;
      expect(CATEGORIES[emptyCategoryIndex].isEmpty).toBe(true); // assert category is empty
      const emptyTd = component.find('.CategoryTreeSelector__column-td').at(emptyCategoryIndex);
      expect(emptyTd.hasClass('CategoryTreeSelector__column-td--empty')).toBe(true);
    });
    it('does not set class "info" on non selected category', () => {
      const td = component.find('.CategoryTreeSelector__column-td').at(SELECTED_INDEX);
      expect(td.hasClass('info')).toBe(true);
    });

    it('when clicking on expand area of an empty category, does not call onExpandCategory', () => {
      const emptyCategoryIndex = 1;
      expect(CATEGORIES[emptyCategoryIndex].isEmpty).toBe(true); // assert category is empty
      const emptyTd = component.find('.CategoryTreeSelector__column-td').at(emptyCategoryIndex);
      emptyTd.find('.CategoryTreeSelector__expand-area').simulate('click');
      expect(ON_EXPAND_CATEGORY).not.toHaveBeenCalled();
    });

    it('when clicking on expand area of a non-empty category, calls onExpandCategory', () => {
      const nonEmptyCategoryIndex = 0;
      expect(CATEGORIES[nonEmptyCategoryIndex].isEmpty).toBe(false); // assert category is non empty
      const emptyTd = component.find('.CategoryTreeSelector__column-td').at(nonEmptyCategoryIndex);
      emptyTd.find('.CategoryTreeSelector__expand-area').simulate('click');
      expect(ON_EXPAND_CATEGORY).toHaveBeenCalledWith(CATEGORIES[nonEmptyCategoryIndex].code);
    });

    it('when clicking on select area, calls onChange', () => {
      const categoryIndex = 1;
      const td = component.find('.CategoryTreeSelector__column-td').at(categoryIndex);
      td.find('.CategoryTreeSelector__select-area').simulate('click');
      expect(ON_CHANGE).toHaveBeenCalledWith(CATEGORIES[categoryIndex].code);
    });
  });
});
