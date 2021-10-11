import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderVersionText = ({
  input,
  label,
  labelSize,
  inputSize,
  alignClass,
  version,
  modifierText,
  creatorText,
  sameAuthorText,
  currentUserName,
  creatorUserName,
  modifierUserName,
}) => (
  <div className="form-group">
    {labelSize > 0 ? (
      <Col xs={12} sm={labelSize} className={alignClass}>
        <ControlLabel htmlFor={input.name}>{label}</ControlLabel>
      </Col>
    ) : (
      ''
    )}
    <Col xs={12} sm={inputSize || 12 - labelSize}>
      <span>
        <strong>{version} </strong>
        {creatorText} {/* @TODO Update href value */}
        <a href="#user">
          {creatorUserName}{' '}
          {creatorUserName === currentUserName ? (
            <span className="label label-primary">{sameAuthorText}</span>
          ) : null}
        </a>{' '}
        {modifierText}{' '}
        <a href="#user">
          {modifierUserName}
          {modifierUserName === currentUserName ? (
            <span className="text-muted"> ({sameAuthorText})</span>
          ) : null}
        </a>
      </span>
    </Col>
  </div>
);

RenderVersionText.propTypes = {
  version: PropTypes.string.isRequired,
  creatorText: PropTypes.string.isRequired,
  modifierText: PropTypes.string.isRequired,
  sameAuthorText: PropTypes.string.isRequired,
  currentUserName: PropTypes.string.isRequired,
  creatorUserName: PropTypes.string.isRequired,
  modifierUserName: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  alignClass: PropTypes.string,
};

RenderVersionText.defaultProps = {
  input: {},
  label: '',
  labelSize: 2,
  inputSize: null,
  alignClass: 'text-right',
};
export default RenderVersionText;
