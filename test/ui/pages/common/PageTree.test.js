import React from 'react';
import { shallow } from 'enzyme';
import { DDTable } from '@entando/ddtable';

import 'test/enzyme-init';
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
  });

  describe('drag and drop', () => {
    let component;
    const handleDropPage = jest.fn();
    beforeEach(() => {
      component = shallow((
        <PageTree
          pages={PAGES}
          onDropPage={handleDropPage}
          {...props}
        />));
    });
    it('calls onDropPage with action of "drop into" if a row is dropped with drop type "medium"', () => {
      component.instance().handleDrop(DDTable.DROP_MEDIUM, PAGES[1], PAGES[0]);
      expect(handleDropPage).toHaveBeenCalledWith(
        PAGES[1].code, PAGES[0].code,
        MovePageModalContainer.INTO_PARENT,
      );
    });
    it('calls onDropPage with action of "drop above" if a row is dropped with drop type "high"', () => {
      component.instance().handleDrop(DDTable.DROP_HIGH, PAGES[1], PAGES[0]);
      expect(handleDropPage).toHaveBeenCalledWith(
        PAGES[1].code, PAGES[0].code,
        MovePageModalContainer.ABOVE_SIBLING,
      );
    });
    it('calls onDropPage with action of "drop below" if a row is dropped with drop type "low"', () => {
      component.instance().handleDrop(DDTable.DROP_LOW, PAGES[1], PAGES[0]);
      expect(handleDropPage).toHaveBeenCalledWith(
        PAGES[1].code, PAGES[0].code,
        MovePageModalContainer.BELOW_SIBLING,
      );
    });
    it('calls nothing if a row is dropped with another drop type', () => {
      component.instance().handleDrop(null, PAGES[1], PAGES[0]);
      expect(handleDropPage).not.toHaveBeenCalled();
    });
  });
});
