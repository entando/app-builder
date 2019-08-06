import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import Languages from 'ui/dashboard/Languages';
import { Link } from 'react-router-dom';
import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';

const component = shallow(<Languages onWillMount={() => {}} activeLanguages={2} />);

describe('Languages', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a Card', () => {
    const element = component.find('Card');
    expect(element).toHaveLength(1);
  });

  it('verify it contains a button', () => {
    const element = component.find('Button');
    expect(element).toHaveLength(1);
    const props = element.props();
    expect(props).toHaveProperty('to', ROUTE_LABELS_AND_LANGUAGES);
    expect(props).toHaveProperty('componentClass', Link);
  });
});
