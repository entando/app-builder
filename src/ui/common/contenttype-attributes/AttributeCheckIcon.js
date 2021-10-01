import React from 'react';
import PropTypes from 'prop-types';

const AttributeCheckIcon = ({ isChecked, title }) => (
  <i
    className={`fa ContTypeAttributeCheckIcon ContTypeAttributeCheckIcon--${isChecked ? 'checked' : 'unchecked'}`}
    title={title}
  />
);

AttributeCheckIcon.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

AttributeCheckIcon.defaultProps = {
  title: '',
};

export default AttributeCheckIcon;
