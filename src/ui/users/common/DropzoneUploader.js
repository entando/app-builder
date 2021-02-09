import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

const DropzoneUploader = ({ onUpload, maxFiles, accept }) => (
  <Dropzone onDrop={onUpload} maxFiles={maxFiles} accept={accept} className="DropzoneUploader">
    {({ getRootProps, getInputProps }) => (
      <section>
        <div className="DropzoneUploader__wrapper" {...getRootProps()}>
          <input {...getInputProps()} />
          <i className="fa fa-cloud-upload DropzoneUploader__icon" />
          <p className="DropzoneUploader__text">
            <FormattedMessage id="user.myProfile.dragAndDrop" />{' '}
            <strong><FormattedMessage id="user.myProfile.browseComputer" /></strong>
          </p>
        </div>
      </section>
  )}
  </Dropzone>
);

DropzoneUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
  maxFiles: PropTypes.number,
  accept: PropTypes.string,
};

DropzoneUploader.defaultProps = {
  maxFiles: 5,
  accept: null,
};

export default DropzoneUploader;
