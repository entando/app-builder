import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import AttributeListMenuActions from 'ui/common/attributes/AttributeListMenuActions';

const onMoveUp = jest.fn();
const onMoveDown = jest.fn();
const onClickDelete = jest.fn();

describe('AttributeListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeListMenuActions
      code="attribute_code"
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onClickDelete={onClickDelete}
      routeToEdit=""
      datatypeCode="code"
    />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<AttributeListMenuActions />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(1);
  });

  describe('test moveUp/moveDown', () => {
    beforeEach(() => {
      component = shallow(<AttributeListMenuActions
        isMovableUp
        isMovableDown
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />);
    });

    it('on item-move-up clicked should call onMoveUp', () => {
      component.find('.AttributeListMenuAction__menu-item-move-up')
        .simulate('click');
      expect(onMoveUp).toHaveBeenCalled();
    });

    it('on item-move-up clicked should call onMoveDown', () => {
      component.find('.AttributeListMenuAction__menu-item-move-down')
        .simulate('click');
      expect(onMoveDown).toHaveBeenCalled();
    });
  });

  it('on item-delete clicked should call onClickDelete', () => {
    component.find('.AttributeListMenuAction__menu-item-delete')
      .simulate('click');
    expect(onClickDelete).toHaveBeenCalled();
  });
});
