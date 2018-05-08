import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PagesList from 'ui/dashboard/PagesList';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { Link } from '@entando/router';

// eslint-disable-next-line
const component = shallow(<PagesList onWillMount={() => {}} pageSize={2} page={3} totalItems={2} language="it" />);


describe('PagesList', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it contains a button', () => {
    const element = component.find('Button');
    expect(element).toHaveLength(1);
    const props = element.props();
    expect(props).toHaveProperty('route', ROUTE_PAGE_ADD);
    expect(props).toHaveProperty('componentClass', Link);
  });

  it('verify it contains a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  it('verify it contains a Paginator', () => {
    expect(component.find('Paginator')).toHaveLength(1);
  });
});
