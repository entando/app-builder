
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';

describe('PageStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageStatusIcon status="draft" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = draft, has class PageStatusIcon--draft', () => {
    const draftComponent = shallow(<PageStatusIcon status="draft" />);
    expect(draftComponent.hasClass('PageStatusIcon--draft')).toBe(true);
  });
  it('if status = published, has class PageStatusIcon--published', () => {
    const draftComponent = shallow(<PageStatusIcon status="published" />);
    expect(draftComponent.hasClass('PageStatusIcon--published')).toBe(true);
  });
  it('if status = unpublished, has class PageStatusIcon--unpublished', () => {
    const draftComponent = shallow(<PageStatusIcon status="unpublished" />);
    expect(draftComponent.hasClass('PageStatusIcon--unpublished')).toBe(true);
  });
});
