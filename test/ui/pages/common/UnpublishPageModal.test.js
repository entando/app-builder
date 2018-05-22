import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import UnpublishPageModal from 'ui/pages/common/UnpublishPageModal';
import { Button } from 'patternfly-react';

const onConfirmUnpublish = jest.fn();

const props = {
  onConfirmUnpublish,
  info: {
    code: 'page_code',
    type: 'page',
  },
};

describe('UnpublishPageModal', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UnpublishPageModal />);
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
      expect(emptyStateIcon.hasClass('UnpublishPageModal__icon')).toBe(true);
    });

    it('has an EmptyStateTitle', () => {
      const emptyStateTitle = component.find('EmptyStateTitle');
      expect(emptyStateTitle.exists()).toBe(true);
    });

    it('has an EmptyStateInfo', () => {
      const emptyStateInfo = component.find('EmptyStateInfo');
      expect(emptyStateInfo.exists()).toBe(true);
      expect(emptyStateInfo.hasClass('UnpublishPageModal__info')).toBe(true);
    });
  });

  describe('component with extra props', () => {
    it('renders info prop', () => {
      component = shallow(<UnpublishPageModal {...props} />);
      const title = component.find('EmptyStateTitle');
      expect(title.render().text()).toContain('page');
    });

    it('clicking on publish button calls onConfirmUnpublish', () => {
      component = shallow(<UnpublishPageModal {...props} />);
      const buttonsProps = component.prop('buttons')[0].props;
      const publishButton = shallow(<Button {...buttonsProps} />);
      publishButton.simulate('click');
      expect(onConfirmUnpublish).toHaveBeenCalled();
    });
  });
});
