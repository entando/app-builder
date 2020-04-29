import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import { CELL_MAP } from 'test/mocks/page-templates/complex';

const ROOT_KEY = Object.keys(CELL_MAP).find(key => key.match(/^root/));
const NO_ROOT_CELL_MAP = { ...CELL_MAP };
delete NO_ROOT_CELL_MAP[ROOT_KEY];

describe('PageConfigGrid', () => {
  let component;

  describe('with COMPLEX page template', () => {
    beforeEach(() => {
      component = shallow(<PageConfigGrid cellMap={CELL_MAP} />);
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

  describe('with no page template', () => {
    beforeEach(() => {
      component = shallow(<PageConfigGrid />);
    });

    it('renders nothing', () => {
      expect(component.children()).toHaveLength(0);
    });
  });

  describe('with a page template with no root (wrong)', () => {
    it('throws an error', () => {
      expect(() => {
        shallow(<PageConfigGrid cellMap={NO_ROOT_CELL_MAP} />);
      }).toThrow();
    });
  });
});
