import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldLevelHelp } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';

const FormLabel = ({
  labelId, langLabelId, helpId, required, pullRight,
}) => {
  const requiredIcon = required ? (
    <sup><i className="fa fa-asterisk required-icon FormLabel__required-icon" /></sup>
  ) :
    null;

  const langLabel = langLabelId ? (
    <span className="label FormLabel__language-label">
      <FormattedMessage id={langLabelId} />
    </span>
  ) : null;

  const fieldHelp = helpId ? (
    <FieldLevelHelp content={formattedText(helpId)} />
  ) : null;

  let classNameSpan = 'FormLabel';
  if (pullRight) {
    classNameSpan += ' pull-right';
  }

  return (
    <span className={classNameSpan}>
      {langLabel}
      <FormattedMessage id={labelId} />
      {requiredIcon}
      {fieldHelp}
    </span>
  );
};

FormLabel.propTypes = {
  labelId: PropTypes.string.isRequired,
  langLabelId: PropTypes.string,
  helpId: PropTypes.string,
  required: PropTypes.bool,
  pullRight: PropTypes.bool,
};

FormLabel.defaultProps = {
  langLabelId: '',
  helpId: '',
  required: false,
  pullRight: false,
};
export default FormLabel;
