import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import { COMPLEX_STRUCT } from 'test/mocks/pageModels';
import { HOMEPAGE_WIDGETS } from 'test/mocks/pageWidgets';


describe('PageConfigGrid (with COMPLEX page model)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageConfigGrid pageModelStruct={COMPLEX_STRUCT} pageWidgets={HOMEPAGE_WIDGETS} />
    ));
  });

  it('has the PageConfigGrid class', () => {
    expect(component.hasClass('PageConfigGrid')).toBe(true);
  });

  it('renders a PageConfigGridCol with col = its pageModelStruct prop', () => {
    expect(component.find('PageConfigGridCol').prop('col')).toBe(COMPLEX_STRUCT);
  });

  it('renders a PageConfigGridCol with pageWidgets = its pageWidgets prop', () => {
    expect(component.find('PageConfigGridCol').prop('pageWidgets')).toBe(HOMEPAGE_WIDGETS);
  });
});
