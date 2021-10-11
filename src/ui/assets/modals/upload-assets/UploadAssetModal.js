import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal } from 'patternfly-react';
import { reduxForm, FieldArray } from 'redux-form';

import UploadAssetModalFiles from 'ui/assets/modals/upload-assets/UploadAssetModalFiles';

import { FORM_NAME, UPLOAD_ASSET_MODAL_ID } from 'ui/assets/modals/upload-assets/constants';

const UploadAssetModal = (props) => {
  const {
    onModalOpen, submitting, files, handleSubmit, name,
  } = props;

  const handleOpenModal = () => {
    onModalOpen({ files });
  };

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage
        id={files && files.length > 1 ? 'cms.label.addAssetPlural' : 'cms.label.addAsset'}
      />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={`${UPLOAD_ASSET_MODAL_ID}${name}`}
      modalFooter={<span />}
      modalTitle={modalTitle}
      modalClassName="UploadAssetModal"
      onOpenModal={handleOpenModal}
    >
      <form onSubmit={handleSubmit}>
        <FieldArray name="files" component={UploadAssetModalFiles} props={props} />
        <div className="UploadAssetModal__upload-modal-buttons">
          <Button type="submit" disabled={submitting}>
            <FormattedMessage id="cms.label.upload" />
          </Button>
        </div>
      </form>
    </GenericModalContainer>
  );
};

UploadAssetModal.propTypes = {
  onModalOpen: PropTypes.func,
  submitting: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  })),
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
};

UploadAssetModal.defaultProps = {
  onModalOpen: () => { },
  handleSubmit: () => { },
  submitting: false,
  files: [],
  name: '',
};

export default reduxForm({
  form: FORM_NAME,
})(UploadAssetModal);
