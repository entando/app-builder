import React from 'react';
import PropTypes from 'prop-types';

import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

const PageStatusIcon = ({ status, differsFromPublished, title }) => {
  const classNameAr = ['fa fa-circle PageStatusIcon', `PageStatusIcon--${status}`];
  if (differsFromPublished) {
    classNameAr.push('PageStatusIcon--diff');
  }
  return <i className={classNameAr.join(' ')} title={title} />;
};

PageStatusIcon.propTypes = {
  status: PropTypes.oneOf([
    PAGE_STATUS_DRAFT,
    PAGE_STATUS_PUBLISHED,
    PAGE_STATUS_UNPUBLISHED]).isRequired,
  differsFromPublished: PropTypes.bool,
  title: PropTypes.string,
};

PageStatusIcon.defaultProps = {
  differsFromPublished: false,
  title: '',
};

export default PageStatusIcon;
