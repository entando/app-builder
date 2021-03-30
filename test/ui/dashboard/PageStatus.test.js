import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import PageStatus from 'ui/dashboard/PageStatus';

const pageStatus = {
  draft: 2,
  published: 3,
  unpublished: 5,
};

const component = shallowWithIntl(<PageStatus onWillMount={() => {}} pageStatus={pageStatus} language="en" />);


describe('UserManagement', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it contains a title', () => {
    expect(component.dive().find('h2')).toHaveLength(1);
  });

  it('verify it contains a DonutChart', () => {
    const element = component.dive().find('DonutChart');
    expect(element).toHaveLength(1);
  });
});
