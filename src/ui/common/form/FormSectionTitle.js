import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const FormSectionTitle = ({ titleId, requireFields }) => (
  <legend role="heading">
    <FormattedMessage id={titleId} />
    {
      requireFields && (
        <div className="FormSectionTitle__required-fields text-right">
        * <FormattedMessage id="app.fieldsRequired" />
        </div>
      )
    }
  </legend>
);


FormSectionTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  requireFields: PropTypes.bool,
};

FormSectionTitle.defaultProps = {
  requireFields: true,
};

export default FormSectionTitle;
