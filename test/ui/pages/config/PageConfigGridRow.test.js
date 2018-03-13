import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageConfigGridRow from 'ui/pages/config/PageConfigGridRow';

const MOCK_ROW = {
  x1: 0,
  x2: 5,
  y1: 1,
  y2: 2,
  cols: [
    {
      x1: 0, x2: 5, y1: 1, y2: 1,
    },
    {
      x1: 0, x2: 5, y1: 2, y2: 2,
    },
  ],
};

const PAGE_WIDGETS = [
  null,
  { type: 'login_form' },
];

const GRID_WIDTH = 10;


describe('PageConfigGridRow', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridRow row={MOCK_ROW} pageWidgets={PAGE_WIDGETS} gridWidth={GRID_WIDTH} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridRow')).toBe(true);
  });

  it('has as many children as the cols', () => {
    expect(component.children()).toHaveLength(MOCK_ROW.cols.length);
  });

  it('passes pageWidgets prop to the children', () => {
    component.children().forEach((child) => {
      expect(child.prop('pageWidgets')).toBe(PAGE_WIDGETS);
    });
  });

  it('passes the col prop to the children', () => {
    component.children().forEach((child, i) => {
      expect(child.prop('col')).toBe(MOCK_ROW.cols[i]);
    });
  });

  it('passes the gridWidth prop to the children', () => {
    component.children().forEach((child) => {
      expect(child.prop('gridWidth')).toBe(GRID_WIDTH);
    });
  });
});
