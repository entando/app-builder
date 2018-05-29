import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataModelListActionsMenu from 'ui/data-models/common/DataModelListActionsMenu';

const props = {
  onClickDelete: jest.fn(),
  payload: ({
    modelId: 'ID',
    descr: 'data model',
    type: 'AAA',
    model: '',
    stylesheet: '',
  }),
};

describe('WidgetListMenuAction', () => {
  let component;
  beforeEach(jest.clearAllMocks);
  it('renders without crashing', () => {
    component = shallow(<DataModelListActionsMenu />);
    expect(component.exists()).toBe(true);
  });


  describe('test list component actions', () => {
    beforeEach(() => {
      component = shallow(<DataModelListActionsMenu {...props} />);
      console.log(component.debug());
    });

    describe('with a row', () => {
      it('has delete action', () => {
        const dropdownKebab = component.find('DropdownKebab');
        expect(dropdownKebab).toHaveLength(1);
        expect(dropdownKebab.find('.DataModelMenuAction__delete')).toHaveLength(1);
      });
      it('verify click delete', () => {
        const preventDefault = jest.fn();
        const dropdownKebab = component.find('DropdownKebab');
        dropdownKebab.find('.DataModelMenuAction__delete').simulate('click', { preventDefault });
        expect(props.onClickDelete).toHaveBeenCalled();
      });
    });
  });
});
