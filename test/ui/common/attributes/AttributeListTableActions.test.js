import React from 'react';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import AttributeListTableActions from 'ui/common/attributes/AttributeListTableActions';
import { MemoryRouter } from 'react-router-dom';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const FIELDS = {
  remove: jest.fn(),
  move: jest.fn(),
};

const onMoveUp = jest.fn();
const onMoveDown = jest.fn();
const onClickDelete = jest.fn();

const ATTRIBUTESLIST = [
  {
    code: 'aaa',
    type: 'Boolean',
    name: 'test1',
    roles: [],
    mandatory: true,
    listFilter: false,
  },
  {
    code: 'bbb',
    type: 'Boolean',
    name: 'test2',
    roles: [],
    mandatory: false,
    listFilter: true,
  },
];

const props = {
  attributes: ATTRIBUTESLIST,
  routeToEdit: '',
  entityCode: '',
  onClickDelete,
  onMoveUp,
  onMoveDown,
  code: 'code',
  datatypeCode: 'THX',
  fields: FIELDS,
};

jest.unmock('react-redux');

describe('AttributeListTableActions', () => {
  let component;
  beforeEach(() => {
    const memorizedUi = <MemoryRouter><AttributeListTableActions {...props} /></MemoryRouter>;
    component = mount(mockRenderWithIntlAndStore(memorizedUi));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(2);
  });

  describe('test moveUp/moveDown', () => {
    it('on item-move-up clicked should call onMoveUp', () => {
      component.find('.AttributeListMenuAction__menu-item-move-up').at(1).simulate('click');
      expect(component.exists()).toBe(true);
    });

    it('on item-move-up clicked should call onMoveDown', () => {
      component.find('.AttributeListMenuAction__menu-item-move-down').at(1).simulate('click');
      expect(component.exists()).toBe(true);
    });


    it('on item-delete clicked should call onClickDelete', () => {
      component.find('.AttributeListMenuAction__menu-item-delete').at(1).simulate('click');
      expect(component.exists()).toBe(true);
    });

    it('on item-delete clicked should call on edit', () => {
      component.find('.AttributeListMenuAction__menu-item-edit').at(1).simulate('click');
      expect(component.exists()).toBe(true);
    });
  });
});
