import React from 'react';
import PropTypes from 'prop-types';


const DataTypeStatusIcon = ({ status, title }) => (
  <i className={`fa DataTypeStatusIcon DataTypeStatusIcon--${status}`} title={title} />
);

DataTypeStatusIcon.propTypes = {
  status: PropTypes.oneOf(['ok', 'ko', 'wip']).isRequired,
  title: PropTypes.string,
};

DataTypeStatusIcon.defaultProps = {
  title: '',
};

export default DataTypeStatusIcon;
