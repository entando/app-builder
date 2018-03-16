import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageConfigGridRow from 'ui/pages/config/PageConfigGridRow';
import { CELL_MAP } from 'test/mocks/page-models/sidebarHoles';


const ROW_CELL = CELL_MAP['row:2-6/6-6'];

const GRID_WIDTH = 10;


describe('PageConfigGridRow', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGridRow cellMap={CELL_MAP} cellKey={ROW_CELL.key} gridWidth={GRID_WIDTH} />
    ));
  });

  it('has the PageConfigGridCol class', () => {
    expect(component.hasClass('PageConfigGridRow')).toBe(true);
  });

  it('has as many children as the cols', () => {
    expect(component.children()).toHaveLength(5);
  });


  it('passes the gridWidth prop to the children', () => {
    component.children().forEach((child) => {
      expect(child.prop('gridWidth')).toBe(GRID_WIDTH);
    });
  });
});
