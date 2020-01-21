
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Modal, Button } from 'patternfly-react';
import GenericModal from 'ui/common/modal/GenericModal';

const onCloseModal = jest.fn();

const props = {
  modalId: 'modalId',
  onCloseModal,
  children: <span />,
};

const toolbarButtons = [
  <Button
    id="button1"
    bsStyle="default"
  >
    default button
  </Button>,
  <Button
    id="button2"
    bsStyle="primary"
  >
    primary button
  </Button>,
];

jest.mock('react-intl');

describe('GenericModal', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GenericModal {...props} />);
  });

  describe('component with required props only', () => {
    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('has close icon', () => {
      const closeButton = component.find('button.close');
      expect(closeButton.exists()).toBe(true);
    });

    it('has show property set to false', () => {
      expect(component.prop('show')).toBe(false);
    });

    it('has children', () => {
      expect(component.find(Modal.Body).children()).toHaveLength(1);
    });

    it('has closeButton only', () => {
      const buttonToolBar = component.find(Modal.Footer).children();
      expect(buttonToolBar).toHaveLength(1);
      expect(buttonToolBar.find('Button').hasClass('btn-cancel')).toBe(true);
    });

    it('if dismiss modal buttons are clicked, onCloseModal should be called', () => {
      const closeButton = component.find('Button.btn-cancel');
      const dismissButton = component.find(Modal.Header).find('button.close');
      closeButton.simulate('click');
      expect(onCloseModal).toHaveBeenCalled();
      dismissButton.simulate('click');
      expect(onCloseModal).toHaveBeenCalled();
    });
  });

  describe('component with extra props', () => {
    it('has show property set to true', () => {
      component.setProps({ visibleModal: 'modalId' });
      expect(component.prop('show')).toBe(true);
    });

    it('renders modalTitle', () => {
      component.setProps({ modalTitle: 'Modal title' });
      const header = component.find(Modal.Header);
      expect(header.render().text()).toEqual('Modal title');
    });

    it('renders button toolbar', () => {
      component.setProps({ buttons: toolbarButtons });
      const footer = component.find(Modal.Footer);
      expect(footer.find('Button')).toHaveLength(3);
      expect(footer.render().find('Button.btn-primary')).toHaveLength(1);
      expect(footer.render().find('Button.btn-default')).toHaveLength(2);
      expect(footer.render().find('Button.btn-cancel')).toHaveLength(1);
    });
  });
});
