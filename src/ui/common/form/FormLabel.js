import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { FieldLevelHelp } from 'patternfly-react';

const FormLabel = ({
  labelId, langLabelId, helpId, required, langLabelText, helpText, labelText, intl,
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

  const msgs = defineMessages({
    help: {
      id: helpId,
    },
  });

  const fieldHelpId = helpId ? (
    <FieldLevelHelp content={intl.formatMessage(msgs.help)} />
  ) : null;


  const fieldHelpText = helpText ? (
    <FieldLevelHelp content={helpText} />
  ) : null;

  const fieldHelp = helpId ? fieldHelpId : fieldHelpText;

  const label = labelId ? (
    <FormattedMessage id={labelId} />
  ) : labelText;


  return (
    <span className="FormLabel">
      {langLabel || langLabelWithText}
      {label}
      {requiredIcon}
      {fieldHelp}
    </span>
  );
};

FormLabel.propTypes = {
  intl: intlShape.isRequired,
  labelId: PropTypes.string,
  labelText: PropTypes.string,
  langLabelText: PropTypes.string,
  langLabelId: PropTypes.string,
  helpId: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  labelId: '',
  labelText: '',
  langLabelId: '',
  langLabelText: '',
  helpId: '',
  helpText: '',
  required: false,
};
export default injectIntl(FormLabel);
