import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

const PageStatusIcon = ({ intl, status }) => {
  const msgs = defineMessages({
    pageStatus: {
      id: `pages.status.${status}`,
      defaultMessage: status,
    },
  });
  const iconTitle = intl.formatMessage(msgs.pageStatus, {});
  const classNameAr = ['fa fa-circle PageStatusIcon', `PageStatusIcon--${status}`];
  return <i className={classNameAr.join(' ')} title={iconTitle} />;
};

PageStatusIcon.propTypes = {
  intl: intlShape.isRequired,
  status: PropTypes.oneOf([
    PAGE_STATUS_DRAFT,
    PAGE_STATUS_PUBLISHED,
    PAGE_STATUS_UNPUBLISHED]).isRequired,
};

export default injectIntl(PageStatusIcon);
