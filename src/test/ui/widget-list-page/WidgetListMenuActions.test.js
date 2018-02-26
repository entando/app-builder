import React from 'react';

import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
// import PageTreeActionMenuButton from 'ui/page-tree/PageTreeActionMenuButton';
import WidgetListMenuAction from 'ui/widget-list-page/WidgetListMenuActions';
import { Dropdown, MenuItem } from 'patternfly-react';

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
    const onClickMock = jest.fn();
    let component;

    beforeEach(() => {
      component = mount((
        <MenuItem
          onClick={onClickMock}
        />
      ));
      console.log('STRUTTURA', component.debug());
    });

    it('should call onClick when clicking on the <a> element', () => {
      component.find('a').first().simulate('click', EVENT);
      expect(onClickMock).toHaveBeenCalled();
    });
    it('should ev.preventDefault() to avoid reloading the page', () => {
      component.find('a').first().simulate('click', EVENT);
      expect(EVENT.preventDefault).toHaveBeenCalled();
    });
  });
});
