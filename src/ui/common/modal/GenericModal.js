import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const GenericModal = ({
  visibleModal,
  modalId,
  modalClassName,
  onOpenModal,
  onCloseModal,
  children,
  buttons,
  modalFooter,
  modalTitle,
  cancelTextKey,
}) => {
  const footer = modalFooter || (
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel GenericModal__cancel" onClick={onCloseModal}>
        <FormattedMessage id={buttons.length ? 'cms.label.cancel' : (cancelTextKey || 'cms.label.okay')} />
      </Button>
      {buttons.map(button => (
        <Button {...button.props} key={button.props.id} />
      ))}
    </Modal.Footer>
  );

  return (
    <Modal
      show={visibleModal === modalId}
      onEnter={onOpenModal}
      onHide={onCloseModal}
      id={modalId}
      dialogClassName={modalClassName}
    >
      <Modal.Header>
        <button
          type="button"
          className="close"
          onClick={onCloseModal}
          aria-hidden="true"
          aria-label="Close"
        >
          <Icon type="pf" name="close" />
        </button>
        {modalTitle}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer}
    </Modal>
  );
};

GenericModal.propTypes = {
  visibleModal: PropTypes.string,
  modalClassName: PropTypes.string,
  modalId: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func,
  modalTitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  modalFooter: PropTypes.node,
  cancelTextKey: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.node),
};

GenericModal.defaultProps = {
  visibleModal: '',
  modalClassName: '',
  modalTitle: '',
  modalFooter: '',
  cancelTextKey: '',
  buttons: [],
  onOpenModal: () => {},
};

export default GenericModal;
