import React from 'react';
import { 
  configEnzymeAdapter,
  createMockHistory,
  mockRenderWithIntlAndStore,
  mockRenderWithRouter,
} from 'test/legacyTestUtils';
import { mount } from 'enzyme';
import AttributeListTableActions from 'ui/common/contenttype-attributes/AttributeListTableActions';

configEnzymeAdapter();
jest.unmock('react-redux');

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
  contentTypeCode: 'THX',
  fields: FIELDS,
};

describe('AttributeListTableActions', () => {
  let history;
  let component;
  beforeEach(() => {
    history = createMockHistory();
    component = mount(
      mockRenderWithRouter(mockRenderWithIntlAndStore(<AttributeListTableActions {...props} />), history),
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a drop down with kebab button', () => {
    expect(component.find('DropdownKebab')).toHaveLength(2);
  });

  describe('test moveUp/moveDown', () => {
    it('on item-move-up clicked should call onMoveUp', () => {
      component
        .find('.ContTypeAttributeListMenuAction__menu-item-move-up')
        .at(1)
        .simulate('click');
      expect(component.exists()).toBe(true);
    });

    it('on item-move-up clicked should call onMoveDown', () => {
      component
        .find('.ContTypeAttributeListMenuAction__menu-item-move-down')
        .at(1)
        .simulate('click');
      expect(component.exists()).toBe(true);
    });

    it('on item-delete clicked should call onClickDelete', () => {
      component
        .find('.ContTypeAttributeListMenuAction__menu-item-delete')
        .at(1)
        .simulate('click');
      expect(component.exists()).toBe(true);
    });

    it('on item-delete clicked should call on edit', () => {
      component
        .find('.ContTypeAttributeListMenuAction__menu-item-edit')
        .at(1)
        .simulate('click');
      expect(component.exists()).toBe(true);
    });
  });
});
