import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const FormSectionTitle = ({
  titleId, requireFields, collapsable, onClick,
}) => (
  <legend>
    <div
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      className="FormSectionTitle__inner-body"
    >
      <FormattedMessage id={titleId} />
      {
      collapsable &&
      <span className="icon fa fa-chevron-down FormSectionTitle__collapse-button" />
    }
      {
      requireFields &&
      <div className="FormSectionTitle__required-fields text-right">
      * <FormattedMessage id="app.fieldsRequired" />
      </div>
    }
    </div>
  </legend>
);


FormSectionTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  requireFields: PropTypes.bool,
  collapsable: PropTypes.bool,
  onClick: PropTypes.func,
};

FormSectionTitle.defaultProps = {
  requireFields: true,
  collapsable: false,
  onClick: () => {},
};

export default FormSectionTitle;
