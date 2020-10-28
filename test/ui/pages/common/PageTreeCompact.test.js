import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreeCompact from 'ui/pages/common/PageTreeCompact';

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

describe('PageTreeCompact', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTreeCompact pages={PAGES} />);
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has the DropdownKebab component for each page', () => {
      expect(component.find('DropdownKebab')).toHaveLength(PAGES.length);
    });

    it('renders a table row for each page', () => {
      expect(component.find('.PageTreeCompact__row')).toHaveLength(PAGES.length);
    });
  });

  describe('when expanding a page', () => {
    let component;
    const handleExpandPage = jest.fn();
    beforeEach(() => {
      component = shallow((
        <PageTreeCompact
          pages={PAGES}
          onExpandPage={handleExpandPage}
        />));
    });

    it('does not call onExpandPage if the page is empty', () => {
      const emptyPageIndex = 1;
      component.find('.PageTreeCompact__icons-label').at(emptyPageIndex)
        .simulate('click', { preventDefault: () => {}, stopPropagation: () => {} });
      expect(PAGES[emptyPageIndex].isEmpty).toBe(true);
      expect(handleExpandPage).not.toHaveBeenCalled();
    });

    it('calls onExpandPage if the page is not empty', () => {
      const notEmptyPageIndex = 0;
      component.find('.PageTreeCompact__icons-label').at(notEmptyPageIndex)
        .simulate('click', { preventDefault: () => {}, stopPropagation: () => {} });
      expect(PAGES[notEmptyPageIndex].isEmpty).toBe(false);
      expect(handleExpandPage).toHaveBeenCalled();
    });
  });
});
