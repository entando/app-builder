import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import HomePageLink from 'ui/internal-page/HomePageLink';

const component = shallow(<HomePageLink link="https://www.entando.com" />);


describe('HomePageLink', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a link', () => {
    expect(component.find('li')).toHaveLength(1);
    expect(component.find('a')).toHaveLength(1);
  });

  it('verify it contains the globe icon', () => {
    expect(component.find('Icon[name="globe"]')).toHaveLength(1);
  });
});
