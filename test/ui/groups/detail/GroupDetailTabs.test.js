import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import GroupDetailTabs from 'ui/groups/detail/GroupDetailTabs';


global.console.error = jest.fn();

describe('GroupDetailTabs', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GroupDetailTabs />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('TabContainer', () => {
    it('has a class GroupDetailTabs__container', () => {
      expect(component.find('.GroupDetailTabs__container').exists()).toBe(true);
    });

    it('has a Nav items and 5 NavItem', () => {
      expect(component.find('Nav').exists()).toBe(true);
      expect(component.find('NavItem')).toHaveLength(5);
    });

    it('has a Component TabContent', () => {
      expect(component.find('TabContent').exists()).toBe(true);
    });
    it('has a 2 TabPane', () => {
      expect(component.find('TabPane').exists()).toBe(true);
      expect(component.find('TabPane')).toHaveLength(2);
    });
  });
});
