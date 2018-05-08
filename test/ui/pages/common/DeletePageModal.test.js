import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DeletePageModal from 'ui/pages/common/DeletePageModal';
import { Button } from 'patternfly-react';

const onConfirmDelete = jest.fn();

const props = {
  onConfirmDelete,
  info: {
    code: 'role_code',
    type: 'role',
  },
};

describe('DeleteRoleModal', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DeletePageModal />);
  });

  describe('component with required props only', () => {
    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('has an EmptyState main container', () => {
      expect(component.find('EmptyState').exists()).toBe(true);
    });

    it('has an EmptyStateIcon', () => {
      const emptyStateIcon = component.find('EmptyStateIcon');
      expect(emptyStateIcon.exists()).toBe(true);
      expect(emptyStateIcon.props()).toHaveProperty('name', 'exclamation');
      expect(emptyStateIcon.props()).toHaveProperty('type', 'fa');
      expect(emptyStateIcon.hasClass('DeletePageModal__icon')).toBe(true);
    });

    it('has an EmptyStateTitle', () => {
      const emptyStateTitle = component.find('EmptyStateTitle');
      expect(emptyStateTitle.exists()).toBe(true);
    });

    it('has an EmptyStateInfo', () => {
      const emptyStateInfo = component.find('EmptyStateInfo');
      expect(emptyStateInfo.exists()).toBe(true);
      expect(emptyStateInfo.hasClass('DeletePageModal__info')).toBe(true);
    });
  });

  describe('component with extra props', () => {
    it('renders info prop', () => {
      component = shallow(<DeletePageModal {...props} />);
      const title = component.find('EmptyStateTitle');
      expect(title.render().text()).toContain('role');
    });

    it('clicking on delete button calls onConfirmDelete', () => {
      component = shallow(<DeletePageModal {...props} />);
      const buttonsProps = component.prop('buttons')[0].props;
      const deleteButton = shallow(<Button {...buttonsProps} />);
      deleteButton.simulate('click');
      expect(onConfirmDelete).toHaveBeenCalled();
    });
  });
});
