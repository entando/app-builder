
import React from 'react';

import 'test/enzyme-init';
import { mount } from 'enzyme';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

jest.unmock('react-redux');

describe('PageStatusIcon', () => {
  it('renders without crashing', () => {
    const component = mount(mockRenderWithIntlAndStore(<PageStatusIcon status="draft" />));
    expect(component.exists()).toEqual(true);
    expect(component.exists('PageStatusIcon')).toBe(true);
  });

  it('if status = draft, has class PageStatusIcon--draft', () => {
    const component = mount(mockRenderWithIntlAndStore(<PageStatusIcon status="draft" />));
    expect(component.exists('.PageStatusIcon--draft')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--published', () => {
    const component = mount(mockRenderWithIntlAndStore(<PageStatusIcon status="published" />));
    expect(component.exists('.PageStatusIcon--published')).toBe(true);
  });

  it('if status = published, has class PageStatusIcon--unpublished', () => {
    const component = mount(mockRenderWithIntlAndStore(<PageStatusIcon status="unpublished" />));
    expect(component.exists('.PageStatusIcon--unpublished')).toBe(true);
  });
});
