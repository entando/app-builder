import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageStatus from 'ui/dashboard/PageStatus';

const pageStatus = {
  draft: 2,
  published: 3,
  unpublished: 5,
};

const component = shallow(<PageStatus onWillMount={() => {}} pageStatus={pageStatus} />);


describe('UserManagement', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it contains a title', () => {
    expect(component.find('h2')).toHaveLength(1);
  });

  it('verify it contains a DonutChart', () => {
    const element = component.find('DonutChart');
    expect(element).toHaveLength(1);
  });
});
