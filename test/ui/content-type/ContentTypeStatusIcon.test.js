import React from 'react';

import { configEnzymeAdapter } from 'test/legacyTestUtils';

import { shallow } from 'enzyme';
import ContentTypeStatusIcon from 'ui/content-type/ContentTypeStatusIcon';

configEnzymeAdapter();

describe('ContentTypeStatusIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<ContentTypeStatusIcon status="0" />);
    expect(component.exists()).toEqual(true);
  });

  it('if status = 0, has class ContentTypeList__statusicon--check', () => {
    const draftComponent = shallow(<ContentTypeStatusIcon status="0" />);
    expect(draftComponent.hasClass('ContentTypeList__statusicon--check')).toBe(true);
  });
  it('if status = 2, has class ContentTypeStatusIcon--exclamation', () => {
    const draftComponent = shallow(<ContentTypeStatusIcon status="2" />);
    expect(draftComponent.hasClass('ContentTypeList__statusicon--exclamation')).toBe(true);
  });
  it('if status = 1, has class ContentTypeStatusIcon--spinner', () => {
    const draftComponent = shallow(<ContentTypeStatusIcon status="1" />);
    expect(draftComponent.hasClass('ContentTypeList__statusicon--spinner')).toBe(true);
  });
});
