import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageConfigGridCol from 'ui/pages/config/PageConfigGridCol';
import { CELL_MAP } from 'test/mocks/page-templates/sidebarHoles';

const FRAME_KEY = 'col:0-0/1-14';
const HOLE_CELL = CELL_MAP['col:2-6/2-6'];
const CONTAINER_CELL = CELL_MAP['col:2-0/11-14'];
const EMPTY_FRAME_CELL = CELL_MAP[FRAME_KEY];

const CELL_MAP_WITH_WIDGET = { ...CELL_MAP };
CELL_MAP_WITH_WIDGET[FRAME_KEY] = {
  ...EMPTY_FRAME_CELL,
  widgetCode: 'single_content',
  widgetTitle: 'Single Content',
  widgetHasConfig: true,
};


describe('PageConfigGridCol (col with empty frame)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol cellMap={CELL_MAP} cellKey={FRAME_KEY} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--frame class', () => {
    expect(component.hasClass('PageConfigGridCol--frame')).toBe(true);
  });

  it('passes no widget down to the content component', () => {
    expect(component.children().first().prop('widget')).toBeUndefined();
  });
});

describe('PageConfigGridCol (col with widget frame)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol cellMap={CELL_MAP_WITH_WIDGET} cellKey={FRAME_KEY} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--frame class', () => {
    expect(component.hasClass('PageConfigGridCol--frame')).toBe(true);
  });
});

describe('PageConfigGridCol (rendering grid hole)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol cellMap={CELL_MAP} cellKey={HOLE_CELL.key} />
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
});

describe('PageConfigGridCol (rendering rows)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridCol cellMap={CELL_MAP} cellKey={CONTAINER_CELL.key} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridCol')).toBe(true);
  });

  it('has the PageConfigGridCol--container class', () => {
    expect(component.hasClass('PageConfigGridCol--container')).toBe(true);
  });
});
