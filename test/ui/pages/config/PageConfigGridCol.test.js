import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageConfigGridCol, { ROW_HEIGHT } from 'ui/pages/config/PageConfigGridCol';

const MOCK_COL_0 = {
  x1: 0,
  x2: 5,
  y1: 0,
  y2: 0,
  frame: {
    descr: 'Navbar 1',
    pos: 0,
  },
};

const MOCK_COL_1 = {
  x1: 6,
  x2: 9,
  y1: 0,
  y2: 0,
  frame: {
    descr: 'Navbar 2',
    pos: 1,
  },
};

const MOCK_HOLE = {
  x1: 10,
  x2: 11,
  y1: 0,
  y2: 3,
};

const MOCK_ROWS = {
  x1: 0,
  x2: 5,
  y1: 1,
  y2: 2,
  rows: [
    {
      x1: 0, x2: 5, y1: 1, y2: 1, cols: [],
    },
    {
      x1: 0, x2: 5, y1: 2, y2: 2, cols: [],
    },
  ],
};

const PAGE_WIDGETS = [
  null,
  { type: 'login_form' },
];

const DEFAULT_GRID_WIDTH = 12;

const getGridWidth = col => (col.x2 - col.x1) + 1;
const getGridHeight = col => (col.y2 - col.y1) + 1;

describe('PageConfigGridCol (col with empty frame)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol col={MOCK_COL_0} pageWidgets={PAGE_WIDGETS} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--frame class', () => {
    expect(component.hasClass('PageConfigGridCol--frame')).toBe(true);
  });

  it('passes the frame down to the content component', () => {
    expect(component.children().first().prop('frame')).toBe(MOCK_COL_0.frame);
  });

  it('passes no widget down to the content component', () => {
    expect(component.children().first().prop('widget')).toBeUndefined();
  });

  it('has the right minHeight', () => {
    const expectedHeight = getGridHeight(MOCK_COL_0) * ROW_HEIGHT;
    expect(component.prop('style').minHeight).toBe(expectedHeight);
  });

  it('has the right % width', () => {
    const expectedWidth = (getGridWidth(MOCK_COL_0) / DEFAULT_GRID_WIDTH) * 100;
    expect(component.prop('style').width).toBe(`${expectedWidth}%`);
  });
});

describe('PageConfigGridCol (col with widget frame)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol col={MOCK_COL_1} pageWidgets={PAGE_WIDGETS} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--frame class', () => {
    expect(component.hasClass('PageConfigGridCol--frame')).toBe(true);
  });

  it('passes the frame down to the content component', () => {
    expect(component.children().first().prop('frame')).toBe(MOCK_COL_1.frame);
  });

  it('passes the widget down to the content component', () => {
    expect(component.children().first().prop('widget')).toEqual({
      code: PAGE_WIDGETS[1].type,
      name: PAGE_WIDGETS[1].type,
    });
  });

  it('has the right minHeight', () => {
    const expectedHeight = getGridHeight(MOCK_COL_1) * ROW_HEIGHT;
    expect(component.prop('style').minHeight).toBe(expectedHeight);
  });

  it('has the right % width', () => {
    const expectedWidth = (getGridWidth(MOCK_COL_1) / DEFAULT_GRID_WIDTH) * 100;
    expect(component.prop('style').width).toBe(`${expectedWidth}%`);
  });
});

describe('PageConfigGridCol (rendering grid hole)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol col={MOCK_HOLE} pageWidgets={PAGE_WIDGETS} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--hole class', () => {
    expect(component.hasClass('PageConfigGridCol--hole')).toBe(true);
  });

  it('has no children', () => {
    expect(component.children()).toHaveLength(0);
  });

  it('has the right minHeight', () => {
    const expectedHeight = getGridHeight(MOCK_HOLE) * ROW_HEIGHT;
    expect(component.prop('style').minHeight).toBe(expectedHeight);
  });

  it('has the right % width', () => {
    const expectedWidth = (getGridWidth(MOCK_HOLE) / DEFAULT_GRID_WIDTH) * 100;
    expect(component.prop('style').width).toBe(`${expectedWidth}%`);
  });
});

describe('PageConfigGridCol (rendering rows)', () => {
  const GRID_WIDTH = 10;
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol col={MOCK_ROWS} pageWidgets={PAGE_WIDGETS} gridWidth={GRID_WIDTH} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--container class', () => {
    expect(component.hasClass('PageConfigGridCol--container')).toBe(true);
  });

  it('has as many children as the rows', () => {
    expect(component.children()).toHaveLength(MOCK_ROWS.rows.length);
  });

  it('has the right minHeight', () => {
    const expectedHeight = getGridHeight(MOCK_ROWS) * ROW_HEIGHT;
    expect(component.prop('style').minHeight).toBe(expectedHeight);
  });

  it('has the right % width', () => {
    const expectedWidth = (getGridWidth(MOCK_ROWS) / GRID_WIDTH) * 100;
    expect(component.prop('style').width).toBe(`${expectedWidth}%`);
  });
});
