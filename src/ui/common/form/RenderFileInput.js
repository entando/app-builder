/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderFileInput = ({
  input: { name, onChange, onBlur },
  append, label, labelSize, placeholder, meta: { touched, error },
  help, disabled, acceptFile,
}) => {
  const genFilesArray = (files) => {
    const filesArray = [];
    Object.values(files).map(f => filesArray.push(f));
    return filesArray;
  };

  return (

    <div className={(touched && error) ? 'text-right form-group has-error' : 'text-right form-group'}>
      <Col xs={labelSize}>
        <ControlLabel htmlFor={name}>
          {label} {help}
        </ControlLabel>
      </Col>
      <Col xs={12 - labelSize}>
        <input
          name={name}
          type="file"
          accept={acceptFile}
          multiple
          onBlur={e => onBlur({ files: genFilesArray(e.target.files) })}
          onChange={e => onChange({ files: genFilesArray(e.target.files) })}
          placeholder={placeholder}
          className="form-control RenderFileInput"
          disabled={disabled}
        />
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && ((error && <span className="help-block">{error}</span>))}
      </Col>
    </div>

  );
};

RenderFileInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  acceptFile: PropTypes.string.isRequired,

};

RenderFileInput.defaultProps = {
  input: {},
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
};
export default RenderFileInput;
