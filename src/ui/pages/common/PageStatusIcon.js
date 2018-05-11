import React from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import { unescape } from 'lodash';

import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

const PageStatusIcon = ({ status, differsFromPublished }) => {
  let iconTitle = formattedText(`pages.status.${status}`, `${status}`, {});
  const classNameAr = ['fa fa-circle PageStatusIcon', `PageStatusIcon--${status}`];
  if (differsFromPublished) {
    classNameAr.push('PageStatusIcon--diff');
    iconTitle = [
      `${formattedText('pages.status.draft')}`,
      `${unescape('\u2260')}`,
      `${formattedText('pages.status.published')}`,
    ].join(' ');
  }

  return <i className={classNameAr.join(' ')} title={iconTitle} />;
};

PageStatusIcon.propTypes = {
  status: PropTypes.oneOf([
    PAGE_STATUS_DRAFT,
    PAGE_STATUS_PUBLISHED,
    PAGE_STATUS_UNPUBLISHED]).isRequired,
  differsFromPublished: PropTypes.bool,
};

PageStatusIcon.defaultProps = {
  differsFromPublished: false,
};

export default PageStatusIcon;
