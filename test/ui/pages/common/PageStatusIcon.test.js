
import React from 'react';

import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import { mockRenderWithIntl } from 'test/testUtils';

jest.unmock('react-redux');

describe('PageStatusIcon', () => {
  it('renders without crashing', () => {
    const component = mount(mockRenderWithIntl(<PageStatusIcon status="draft" />));
    expect(component.exists()).toEqual(true);
    expect(component.exists('PageStatusIcon')).toBe(true);
  });

  it('if status = draft, has class PageStatusIcon--draft', () => {
    const component = shallow(mockRenderWithIntl(<PageStatusIcon status="draft" />));
    expect(component.exists('PageStatusIcon--draft')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--published', () => {
    const component = shallow(mockRenderWithIntl(<PageStatusIcon status="published" />));
    expect(component.exists('PageStatusIcon--published')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--unpublished', () => {
    const component = shallow(mockRenderWithIntl(<PageStatusIcon status="unpublished" />));
    expect(component.exists('PageStatusIcon--unpublished')).toBe(true);
  });
});
