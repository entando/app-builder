import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import {
  PAGE_STATUS_DRAFT,
  PAGE_STATUS_PUBLISHED,
  PAGE_STATUS_UNPUBLISHED,
} from 'state/pages/const';

const StatusBadge = ({ intl, status }) => {
  const msgs = defineMessages({
    pageStatus: {
      id: `pages.status.${status}`,
      defaultMessage: status,
    },
  });
  const iconTitle = intl.formatMessage(msgs.pageStatus, {});
  const classNameAr = ['StatusBadge-circle', `StatusBadge-circle--${status}`];

  return (
    <div
      className={`StatusBadge StatusBadge-container--${status}`}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <i className={classNameAr.join(' ')} title={iconTitle} />
      <span>{status}</span>
    </div>
  );
};

StatusBadge.propTypes = {
  intl: intlShape.isRequired,
  status: PropTypes.oneOf([
    PAGE_STATUS_DRAFT,
    PAGE_STATUS_PUBLISHED,
    PAGE_STATUS_UNPUBLISHED,
  ]).isRequired,
};

export default injectIntl(StatusBadge);
