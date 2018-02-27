import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const FormSectionTitle = ({ titleId }) => (
  <legend>
    <FormattedMessage id={titleId} />
    <div className="FormSectionTitle__required-fields text-right">
      * <FormattedMessage id="app.fieldsRequired" />
    </div>
  </legend>
);


FormSectionTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
};

export default FormSectionTitle;
