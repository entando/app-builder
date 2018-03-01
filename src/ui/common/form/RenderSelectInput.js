import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';


const RenderSelectInput = ({
  options, labelId, fieldName, mandatory,
}) => {
  const optionList = options.map(option =>
    <option key={option.pageCode} value={option.pageCode}>{option.shortFullTitle}</option>);

  return (
    <div className="form-group">
      <Col xs={2} className="text-right">
        <span id="settings-homePageCode">
          <FormattedMessage id={labelId} />
        </span>
        <i className={(mandatory) ? 'fa fa-asterisk PageSettings__required-icon' : ''} />
      </Col>
      <Col xs={10}>
        <Field component="select" name={fieldName} className="form-control" >
          {optionList}
        </Field>
      </Col>
    </div>
  );
};

RenderSelectInput.propTypes = {
  options: PropTypes.node,
  labelId: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
};

RenderSelectInput.defaultProps = {
  options: [],
  mandatory: false,
};
export default RenderSelectInput;
