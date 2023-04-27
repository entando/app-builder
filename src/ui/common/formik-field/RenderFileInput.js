import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { useFormikContext } from 'formik';

const RenderFileInput = ({
  field,
  append,
  label,
  labelSize,
  placeholder,
  meta: { touched, error },
  help,
  disabled,
  acceptFile,
}) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setFieldValue(field.name, { files: Object.values(event.target.files) });
  };

  const { value, ...restOfField } = field;

  return (
    <div className={(touched && error) ? 'text-right form-group has-error' : 'text-right form-group'}>
      <Col xs={labelSize}>
        <ControlLabel htmlFor={restOfField.name}>
          {label} {help}
        </ControlLabel>
      </Col>
      <Col xs={12 - labelSize}>
        <input
          {...restOfField}
          name={restOfField.name}
          type="file"
          accept={acceptFile}
          multiple
          onChange={handleChange}
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
  field: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.shape({}),
  }),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  acceptFile: PropTypes.string,
};

RenderFileInput.defaultProps = {
  field: {},
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  acceptFile: '',
};

export default RenderFileInput;
