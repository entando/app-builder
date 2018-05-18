import React from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

const PageStatusIcon = ({ status }) => {
  const iconTitle = formattedText(`pages.status.${status}`, `${status}`, {});
  const classNameAr = ['fa fa-circle PageStatusIcon', `PageStatusIcon--${status}`];
  return <i className={classNameAr.join(' ')} title={iconTitle} />;
};

PageStatusIcon.propTypes = {
  status: PropTypes.oneOf([
    PAGE_STATUS_DRAFT,
    PAGE_STATUS_PUBLISHED,
    PAGE_STATUS_UNPUBLISHED]).isRequired,
};

export default PageStatusIcon;
