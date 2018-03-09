import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import {
  COMPLEX_STRUCT, COMPLEX_PAYLOAD, SINGLE_CELL_STRUCT, SINGLE_CELL_PAYLOAD,
  SIDEBAR_HOLES_STRUCT, SIDEBAR_HOLES_PAYLOAD,
} from 'test/mocks/pageModels';

describe('PageConfigGrid (with COMPLEX page model)', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageConfigGrid pageModelStruct={COMPLEX_STRUCT} />);
  });

  it('has the PageConfigGrid class', () => {
    expect(component.hasClass('PageConfigGrid')).toBe(true);
  });

  it('has as many rows as the rows defined in the page model struct', () => {
    expect(component.find('.PageConfigGrid__row')).toHaveLength(COMPLEX_STRUCT.rows.length);
  });

  it('has as many slots as the number of frames', () => {
    expect(component.find('.PageConfigGrid__slot'))
      .toHaveLength(COMPLEX_PAYLOAD.configuration.frames.length);
  });
});

describe('PageConfigGrid (with SINGLE_CELL page model)', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageConfigGrid pageModelStruct={SINGLE_CELL_STRUCT} />);
  });

  it('has the PageConfigGrid class', () => {
    expect(component.hasClass('PageConfigGrid')).toBe(true);
  });

  it('has as many rows as the rows defined in the page model struct', () => {
    expect(component.find('.PageConfigGrid__row')).toHaveLength(SINGLE_CELL_STRUCT.rows.length);
  });

  it('has as many slots as the number of frames', () => {
    expect(component.find('.PageConfigGrid__slot'))
      .toHaveLength(SINGLE_CELL_PAYLOAD.configuration.frames.length);
  });
});

describe('PageConfigGrid (with SIDEBAR_HOLES page model)', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageConfigGrid pageModelStruct={SIDEBAR_HOLES_STRUCT} />);
  });

  it('has the PageConfigGrid class', () => {
    expect(component.hasClass('PageConfigGrid')).toBe(true);
  });

  it('has 24 rows as there are nested rows', () => {
    expect(component.find('.PageConfigGrid__row')).toHaveLength(24);
  });

  it('has as many slots as the number of frames', () => {
    expect(component.find('.PageConfigGrid__slot'))
      .toHaveLength(SIDEBAR_HOLES_PAYLOAD.configuration.frames.length);
  });
});
