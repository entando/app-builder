import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';

const PageStatusIcon = ({ status, differsFromPublished }) => {
  const classNameAr = ['fa fa-circle PageStatusIcon', `PageStatusIcon--${status}`];
  if (differsFromPublished) {
    classNameAr.push('PageStatusIcon--diff');
  }
  return <i className={classNameAr.join(' ')} />;
};

PageStatusIcon.propTypes = {
  status: PropTypes.oneOf([PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED]).isRequired,
  differsFromPublished: PropTypes.bool,
};

PageStatusIcon.defaultProps = {
  differsFromPublished: false,
};

export default PageStatusIcon;
