import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const DropzoneUploader = ({ onUpload, maxFiles, accept }) => (
  <Dropzone onDrop={onUpload} maxFiles={maxFiles} accept={accept} className="DropzoneUploader">
    {({ getRootProps, getInputProps }) => (
      <section>
        <div className="DropzoneUploader__wrapper" {...getRootProps()}>
          <input {...getInputProps()} />
          <i className="fa fa-cloud-upload DropzoneUploader__icon" />
          <p className="DropzoneUploader__text">Drag and drop or <span>Browse your computer</span></p>
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
