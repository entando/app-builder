import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
// import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

// const options = ['nello', 'lallo', 'rollo'];


const RenderSelectInput = ({ options, labelId }) => {
  const optionList = options.map(option =>
    <option key={option}>{option}</option>);

  return (
    <div className="form-group">
      <Col xs={2} className="text-right">
        <span id="settings-homePageCode">
          <FormattedMessage id={labelId} />
        </span>
        <i className="fa fa-asterisk PageSettings__required-icon" />
      </Col>
      <Col xs={10}>
        <select component="select" className="form-control" >
          {optionList}
        </select>
      </Col>
    </div>
  );
};

RenderSelectInput.propTypes = {
  options: PropTypes.node,
  labelId: PropTypes.string.isRequired,
};

RenderSelectInput.defaultProps = {
  options: [],
};
export default RenderSelectInput;
