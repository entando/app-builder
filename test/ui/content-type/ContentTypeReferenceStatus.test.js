import React from 'react';

import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import ContentTypeReferenceStatus from 'ui/content-type/ContentTypeReferenceStatus';

configEnzymeAdapter();

const props = {
  onDidMount: jest.fn(),
  onReload: jest.fn(),
  status: {
    type: 'warning',
    status: 'toRefresh',
    contentTypesCode: ['CCC'],
  },
};

describe('ContentTypeReferenceStatus', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ContentTypeReferenceStatus {...props} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has Alert component', () => {
    expect(component.find('Alert').exists()).toBe(true);
  });

  it('has no Alert component', () => {
    component = shallow(<ContentTypeReferenceStatus {...props} status={{ type: 'success' }} />);
    expect(component.find('Alert').exists()).toBe(false);
  });

  it('has class ContentTypeReferenceStatus__text ', () => {
    expect(component.hasClass('ContentTypeReferenceStatus')).toBe(true);
  });
});
