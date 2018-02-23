import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';

const RenderTextInput = ({
  input, name, label, placeholder, meta: { touched, error }, help,
}) => (

  <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
    <label htmlFor={name} className="col-xs-2 control-label">
      {label} {help}
    </label>
    <Col xs={10}>
      <input {...input} placeholder={placeholder} type="text" className="form-control" />
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>

);

RenderTextInput.propTypes = {
  input: PropTypes.shape({}),
  name: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
};

RenderTextInput.defaultProps = {
  input: {},
  name: '',
  label: '',
  placeholder: '',
  meta: {},
  help: null,
};
export default RenderTextInput;
