
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
    expect(component.hasClass('PageStatusIcon--diff')).toBe(false);
  });

  it('if status = published, has class PageStatusIcon--published', () => {
    const component = shallow(<PageStatusIcon status="published" />);
    expect(component.hasClass('PageStatusIcon--published')).toBe(true);
    expect(component.hasClass('PageStatusIcon--diff')).toBe(false);
  });

  it('if differsFromPublished = true, has class PageStatusIcon--diff', () => {
    const component = shallow(<PageStatusIcon status="published" differsFromPublished />);
    expect(component.hasClass('PageStatusIcon--diff')).toBe(true);
  });
});
