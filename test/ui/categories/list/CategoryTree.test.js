import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import CategoryTree from 'ui/categories/list/CategoryTree';

const categories = [{
  code: 'home',
  title: 'All',
  depth: 0,
  expanded: true,
  isEmpty: false,
},
{
  code: 'mycategory1',
  title: 'My category 1',
  depth: 1,
  expanded: false,
  isEmpty: false,
},
{
  code: 'mycategory2',
  title: 'My category 2',
  depth: 1,
  expanded: false,
  isEmpty: true,
}];

describe('CategoryTree', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow(<CategoryTree categories={categories} locale="en" />);
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('renders a table row for each category', () => {
      expect(component.find('.CategoryTree__row')).toHaveLength(categories.length);
    });
  });

  describe('when expanding a category', () => {
    let component;
    const onExpandCategory = jest.fn();

    beforeEach(() => {
      component = shallow(<CategoryTree
        categories={categories}
        onExpandCategory={onExpandCategory}
      />);
    });

    it('does not call onExpandCategory if the page is empty', () => {
      const emptyCategoryIndex = 2;
      component.find('.CategoryTree__icons-label').at(emptyCategoryIndex)
        .simulate('click', { preventDefault: () => {} });
      expect(onExpandCategory).not.toHaveBeenCalled();
    });

    it('calls onExpandCategory if the page is not empty', () => {
      const notEmptyCategoryIndex = 0;
      component.find('.CategoryTree__icons-label').at(notEmptyCategoryIndex)
        .simulate('click', { preventDefault: () => {} });
      expect(onExpandCategory).toHaveBeenCalled();
    });
  });
});
