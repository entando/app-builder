import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import CategoryListMenuActions from 'ui/categories/list/CategoryListMenuActions';

const onClickDelete = jest.fn();

const props = {
  onClickDelete,
  code: 'role_code',
};

describe('CategoryListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<CategoryListMenuActions {...props} />);
  });

  it('errors without a code', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<CategoryListMenuActions />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(1);
  });

  it('has a menuItem with class CategoryListMenuAction__menu-item-delete', () => {
    expect(component.find('.CategoryListMenuAction__menu-item-delete')).toHaveLength(1);
  });

  it('clicking on delete MenuItem component calls onClickDelete', () => {
    const deleteButton = component.find('.CategoryListMenuAction__menu-item-delete');
    deleteButton.simulate('click');
    expect(onClickDelete).toHaveBeenCalled();
  });
});
