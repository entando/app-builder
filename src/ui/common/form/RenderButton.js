import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, Button } from 'patternfly-react';

const RenderButton = ({
  meta: { touched, error },
  labelSize,
  alignClass,
  label,
  help,
  inputSize,
  buttonContent,
  onClick,
  hasLabel,
}) => {
  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  const errorBox = touched && error ? <span className="help-block">{error}</span> : null;

  return (
    <div className={containerClasses}>
      {hasLabel && (
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={inputSize || 12 - labelSize}>
        <Button
          bsStyle="primary"
          onClick={onClick}
        >
          {buttonContent}
        </Button>
        {errorBox}
      </Col>
    </div>
  );
};

RenderButton.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  help: PropTypes.node,
  inputSize: PropTypes.number,
  buttonContent: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  hasLabel: PropTypes.bool,
};

RenderButton.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: {},
  },
  label: null,
  labelSize: 2,
  alignClass: 'text-right',
  help: null,
  inputSize: null,
  hasLabel: true,
};
export default RenderButton;
