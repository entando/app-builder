
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';

describe('PageStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageStatusIcon status="draft" />);
    expect(component.exists()).toEqual(true);
    expect(component.hasClass('PageStatusIcon')).toBe(true);
  });

  it('if status = draft, has class PageStatusIcon--draft', () => {
    const component = shallow(<PageStatusIcon status="draft" />);
    expect(component.hasClass('PageStatusIcon--draft')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--published', () => {
    const component = shallow(<PageStatusIcon status="published" />);
    expect(component.hasClass('PageStatusIcon--published')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--unpublished', () => {
    const component = shallow(<PageStatusIcon status="unpublished" />);
    expect(component.hasClass('PageStatusIcon--unpublished')).toBe(true);
  });
});
