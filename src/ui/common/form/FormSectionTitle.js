import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const FormSectionTitle = ({ titleId, requireFields, subtitle }) => (
  <legend>
    <FormattedMessage id={titleId} />
    {
      requireFields && (
        <div className="FormSectionTitle__required-fields text-right">
        * <FormattedMessage id="app.fieldsRequired" />
        </div>
      )
    }
    {
      subtitle && <div className="FormSectionTitle__subtitle"><FormattedMessage id={subtitle} /></div>
    }
  </legend>
);


FormSectionTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  requireFields: PropTypes.bool,
  subtitle: PropTypes.string,
};

FormSectionTitle.defaultProps = {
  requireFields: true,
  subtitle: undefined,
};

export default FormSectionTitle;
