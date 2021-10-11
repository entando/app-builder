import React from 'react';
import { shallow } from 'enzyme';
import { configEnzymeAdapter } from 'test/legacyTestUtils';

import ContentTemplateListPage from 'ui/content-template/ContentTemplateListPage';
import ContentTemplateListContainer from 'ui/content-template/ContentTemplateListContainer';

configEnzymeAdapter();

let component;

describe('content-template/ContentTemplateListPage', () => {
  beforeEach(() => {
    component = shallow(<ContentTemplateListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('contains ContentTemplateListContainer', () => {
    expect(component.find(ContentTemplateListContainer).exists()).toBe(true);
  });
});
