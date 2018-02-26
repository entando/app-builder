import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListMenuAction from 'ui/widget-list-page/WidgetListMenuActions';

const EVENT = {
  preventDefault: jest.fn(),
};


describe('ui/widget-list-page/WidgetListMenuAction', () => {
  beforeEach(jest.clearAllMocks);
  it('renders without crashing', () => {
    const component = shallow(<WidgetListMenuAction />);
    expect(component.exists()).toBe(true);
  });

  describe('on click', () => {
    let component;

    beforeEach(() => {
      component = shallow(<WidgetListMenuAction />);
    });

    it('should call handler function and preventDefault', () => {
      const handler = jest.fn();
      const result = component.instance().handleClick(handler);
      result(EVENT);
      expect(handler).toHaveBeenCalled();
      expect(EVENT.preventDefault).toHaveBeenCalled();
    });

    it('should call ev.preventDefault only', () => {
      const result = component.instance().handleClick();
      result(EVENT);
      expect(EVENT.preventDefault).toHaveBeenCalled();
    });
  });
});
