import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal } from 'patternfly-react';

import ContentsFilterBrowserContainer from 'ui/widget-forms/contents-filter/ContentsFilterBrowserContainer';

export const ContentsFilterModalID = 'ContentsFilterModal';

const ContentsFilterModal = (props) => {
  const {
    modalTitleText, onSave, invalid,
    submitting, lastSelectedRow,
  } = props;
  const contentChosen = lastSelectedRow && (lastSelectedRow.id || lastSelectedRow.contentId);
  const buttons = [
    <Button
      type="button"
      bsStyle="primary"
      className="app-tour-step-20"
      disabled={invalid || submitting || !contentChosen}
      id="ContentsFilterModal__button-save"
      onClick={() => {
        onSave(lastSelectedRow);
      }}
    >
      <FormattedMessage id="cms.label.choose" />
    </Button>,
  ];

  const modalTitle = modalTitleText && (
    <Modal.Title>
      {modalTitleText}
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={ContentsFilterModalID}
      buttons={buttons}
      modalTitle={modalTitle}
      modalClassName="ContentsFilterModal"
    >
      <ContentsFilterBrowserContainer
        fetchOnMount
        {...props}
      />
    </GenericModalContainer>
  );
};

ContentsFilterModal.propTypes = {
  modalTitleText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  lastSelectedRow: PropTypes.shape({
    id: PropTypes.string,
    contentId: PropTypes.string,
  }),
};

ContentsFilterModal.defaultProps = {
  modalTitleText: '',
  invalid: false,
  submitting: false,
  lastSelectedRow: {},
};

export default ContentsFilterModal;
