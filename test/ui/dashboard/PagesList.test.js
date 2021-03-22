import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import PagesList from 'ui/dashboard/PagesList';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const component = shallowWithIntl(<PagesList onWillMount={() => {}} pageSize={2} page={3} totalItems={2} language="it" />);


describe('PagesList', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it contains a button', () => {
    const element = component.dive().find('Button');
    expect(element).toHaveLength(1);
    const props = element.props();
    expect(props).toHaveProperty('to', ROUTE_PAGE_ADD);
    expect(props).toHaveProperty('componentClass', Link);
  });

  it('verify it contains DataTable', () => {
    expect(component.dive().find('DataTable')).toHaveLength(1);
  });

  it('verify it contains a Paginator', () => {
    expect(component.dive().find('Paginator')).toHaveLength(1);
  });
});
