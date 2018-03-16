import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import { CELL_MAP } from 'test/mocks/page-models/complex';

const ROOT_KEY = Object.keys(CELL_MAP).find(key => key.match(/^root/));

describe('PageConfigGrid (with COMPLEX page model)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGrid cellMap={CELL_MAP} />
    ));
  });

  it('has the PageConfigGrid class', () => {
    expect(component.hasClass('PageConfigGrid')).toBe(true);
  });

  it('renders a PageConfigGridCol with cellMap = its cellMap prop', () => {
    expect(component.find('PageConfigGridCol').prop('cellMap')).toBe(CELL_MAP);
  });

  it('renders a PageConfigGridCol with cellKey = the root key from the CELL MAP', () => {
    expect(component.find('PageConfigGridCol').prop('cellKey')).toBe(ROOT_KEY);
  });
});
