import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Button } from 'patternfly-react';
import MovePageModal from 'ui/pages/common/MovePageModal';

const onConfirmMove = jest.fn();

const props = {
  onConfirmMove,
  info: {
    sourceCode: 'a',
    targetCode: 'b',
    action: 'up',
    type: 'page',
  },
};

jest.mock('react-intl');

describe('MovePageModal', () => {
  let component;
  beforeEach(() => {
    component = shallow(<MovePageModal />);
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
      expect(emptyStateIcon.hasClass('MovePageModal__icon')).toBe(true);
    });

    it('has an EmptyStateTitle', () => {
      const emptyStateTitle = component.find('EmptyStateTitle');
      expect(emptyStateTitle.exists()).toBe(true);
    });

    it('has an EmptyStateInfo', () => {
      const emptyStateInfo = component.find('EmptyStateInfo');
      expect(emptyStateInfo.exists()).toBe(true);
      expect(emptyStateInfo.hasClass('MovePageModal__info')).toBe(true);
    });
  });

  describe('component with extra props', () => {
    it('renders info prop', () => {
      component = shallow(<MovePageModal {...props} />);
      const title = component.find('EmptyStateTitle');
      expect(title.render().text()).toContain('page');
    });

    it('clicking on delete button calls onConfirmMove', () => {
      component = shallow(<MovePageModal {...props} />);
      const buttonsProps = component.prop('buttons')[0].props;
      const deleteButton = shallow(<Button {...buttonsProps} />);
      deleteButton.simulate('click');
      expect(onConfirmMove).toHaveBeenCalled();
    });
  });
});
