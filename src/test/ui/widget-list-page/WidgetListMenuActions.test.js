import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListMenuAction from 'ui/widget-list-page/WidgetListMenuActions';
import { Dropdown } from 'patternfly-react';

const EVENT = {
  preventDefault: jest.fn(),
};


const onClickDelete = jest.fn();

describe('ui/widget-list-page/WidgetListMenuAction', () => {
  beforeEach(jest.clearAllMocks);
  it('renders without crashing', () => {
    const component = shallow(<WidgetListMenuAction />);
    expect(component.exists()).toBe(true);
  });

  it('checks component structure with Dropdown', () => {
    const component = shallow(<Dropdown />);
    expect(component.exists()).toBe(true);
  });

  it('it accepts an onClick prop', () => {
    const component = shallow(<Dropdown onClick={onClickDelete} />);
    component.simulate('click', EVENT);
    expect(onClickDelete).toHaveBeenCalled();
  });

  it('does nothing if clicked but no handler is provided', () => {
    const component = shallow(<Dropdown />);
    component.simulate('click', EVENT);
    expect(onClickDelete).not.toHaveBeenCalled();
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
