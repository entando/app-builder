import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

import UploadAssetModalContainer from 'ui/assets/modals/upload-assets/UploadAssetModalContainer';

const AssetsUpload = ({
  onUpload, onAssetSelected, name, customClassName,
  customTriggerComponent, customDropzoneProps,
  ownerGroup,
}) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const {
    getRootProps, getInputProps, isDragActive, open,
  } = useDropzone({
    onDrop: handleDrop,
    ...customDropzoneProps,
  });

  const renderedDefaultTriggerComponent = (
    <Fragment>
      <i className="fa fa-cloud-upload UploadAsset__upload-icon" />
      <p>
        {
    isDragActive
      ? <FormattedMessage id="cms.label.dropFilesHere" defaultMessage="Drop the files here" />
      : (
        <Fragment>
          <FormattedMessage id="cms.label.dragAndDrop" defaultMessage="Drag and drop or " />
          <span className="UploadAsset__upload-description-browse"><FormattedMessage id="cms.label.browseYourComputer" defaultMessage="Browse your computer" /></span>
        </Fragment>
      )
  }
      </p>
    </Fragment>
  );
  const CustomTriggerComponent = customTriggerComponent;
  const renderedTriggerComponent = customTriggerComponent ? (
    <CustomTriggerComponent onClick={open} />
  ) : (
    renderedDefaultTriggerComponent
  );
  return (
    <Fragment>
      <div {...getRootProps()} className={`UploadAsset ${customClassName}`}>
        <input {...getInputProps()} />
        {
          renderedTriggerComponent
        }
      </div>
      <UploadAssetModalContainer
        onAssetSelected={onAssetSelected}
        ownerGroup={ownerGroup}
        name={name}
      />
    </Fragment>
  );
};

AssetsUpload.propTypes = {
  onUpload: PropTypes.func,
  onAssetSelected: PropTypes.func,
  name: PropTypes.string,
  customTriggerComponent: PropTypes.func,
  customClassName: PropTypes.string,
  customDropzoneProps: PropTypes.shape({}),
  ownerGroup: PropTypes.string,
};

AssetsUpload.defaultProps = {
  onUpload: () => { },
  onAssetSelected: () => {},
  name: '',
  customTriggerComponent: null,
  customClassName: '',
  customDropzoneProps: {},
  ownerGroup: '',
};

export default AssetsUpload;
