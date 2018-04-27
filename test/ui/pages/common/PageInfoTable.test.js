
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageInfoTable from 'ui/pages/common/PageInfoTable';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

describe('PageInfoTable', () => {
  it('when there is no page, renders nothing', () => {
    const component = shallow(<PageInfoTable />);
    expect(component.children()).toHaveLength(1);
  });

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageInfoTable page={HOMEPAGE_PAYLOAD} />);
    });

    it('has class PageInfoTable', () => {
      expect(component.hasClass('PageInfoTable')).toBe(true);
    });

    it('renders the table', () => {
      expect(component.find('table').exists()).toBe(true);
    });
  });
});
