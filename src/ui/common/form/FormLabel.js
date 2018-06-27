import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldLevelHelp } from 'patternfly-react';
import { formattedText } from '@entando/utils';

const FormLabel = ({
  labelId, langLabelId, helpId, required, langLabelText, helpText,
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

  const langLabelWithText = langLabelText ? (
    <span className="label FormLabel__language-label">
      {langLabelText}
    </span>
  ) : null;

  const fieldHelpId = helpId ? (
    <FieldLevelHelp content={formattedText(helpId)} />
  ) : null;


  const fieldHelpText = helpText ? (
    <FieldLevelHelp content={helpText} />
  ) : null;

  const fieldHelp = helpId ? fieldHelpId : fieldHelpText;

  return (
    <span className="FormLabel">
      {langLabel || langLabelWithText}
      <FormattedMessage id={labelId} />
      {requiredIcon}
      {fieldHelp}
    </span>
  );
};

FormLabel.propTypes = {
  labelId: PropTypes.string.isRequired,
  langLabelText: PropTypes.string,
  langLabelId: PropTypes.string,
  helpId: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  langLabelId: '',
  langLabelText: '',
  helpId: '',
  helpText: '',
  required: false,
};
export default FormLabel;
