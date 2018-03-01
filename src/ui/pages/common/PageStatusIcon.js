import React from 'react';
import PropTypes from 'prop-types';


const PageStatusIcon = ({ status }) => (
  <i className={`fa fa-circle PageStatusIcon PageStatusIcon--${status}`} />
);

PageStatusIcon.propTypes = {
  status: PropTypes.oneOf(['draft', 'published', 'unpublished']).isRequired,
};

export default PageStatusIcon;
