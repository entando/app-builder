import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button } from 'patternfly-react';
import FormattedMessage from 'react-intl';


const DeleteModal = ({ isVisible, onCloseModal, onDelete }) => (
  <Modal show={isVisible} onHide={onCloseModal}>
    <Modal.Header>
      <button
        className="close"
        onClick={onCloseModal}
        aria-hidden="true"
        aria-label="Close"
      >
        <Icon type="pf" name="close" />
      </button>
      <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* insert body here */}
    </Modal.Body>
    <Modal.Footer>
      <Button
        bsStyle="default"
        className="btn-cancel"
        onClick={onCloseModal}
      >
         Cancel
      </Button>
      <Button bsStyle="primary" onClick={onDelete}>
         Save
      </Button>
    </Modal.Footer>
  </Modal>
);

DeleteModal.propTypes = {
  isVisible: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

DeleteModal.defaultProps = {
  isVisible: false,
  onDelete: null,
};

export default DeleteModal;
