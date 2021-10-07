import React from 'react';
import { configEnzymeAdapter, mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
import { mount } from 'enzyme';
import DeleteAttributeModal from 'ui/content-type/attributes/DeleteAttributeModal';

configEnzymeAdapter();

const onConfirmDelete = jest.fn();

const props = {
  onConfirmDelete,
  info: {
    code: 'attribute_code',
    type: 'attribute',
  },
};

const STATE = {
  modal: { visibleModal: 'DeleteAttributeModal', info: {} },
};

jest.unmock('react-redux');

describe('DeleteAttributeModal', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithIntlAndStore(<DeleteAttributeModal />, STATE));
  });

  describe('component with required props only', () => {
    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('has an EmptyState main container', () => {
      // const child = component.node.props.children;
      expect(component.find('EmptyState').exists()).toBe(true);
    });

    it('has an EmptyStateIcon', () => {
      const emptyStateIcon = component.find('EmptyStateIcon');
      expect(emptyStateIcon.exists()).toBe(true);
      expect(emptyStateIcon.props()).toHaveProperty('name', 'exclamation');
      expect(emptyStateIcon.props()).toHaveProperty('type', 'fa');
      expect(emptyStateIcon.hasClass('DeleteAttributeModal__icon')).toBe(true);
    });

    it('has an EmptyStateTitle', () => {
      const emptyStateTitle = component.find('EmptyStateTitle');
      expect(emptyStateTitle.exists()).toBe(true);
    });

    it('has an EmptyStateInfo', () => {
      const emptyStateInfo = component.find('EmptyStateInfo');
      expect(emptyStateInfo.exists()).toBe(true);
      expect(emptyStateInfo.hasClass('DeleteAttributeModal__info')).toBe(true);
    });
  });

  describe('component with extra props', () => {
    it('renders info prop', () => {
      component = mount(mockRenderWithIntlAndStore(<DeleteAttributeModal {...props} />, STATE));
      const title = component.find('EmptyStateTitle');
      expect(title.render().text()).toContain('attribute');
    });
  });
});
