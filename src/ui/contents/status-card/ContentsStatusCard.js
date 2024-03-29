import React, { Component } from 'react';
import { DonutChart } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { formatDate, hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import {
  SUPERUSER_PERMISSION,
  ADMINISTRATION_AREA_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
} from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

const contentStatusMsgs = defineMessages({
  contents: {
    id: 'cms.contents.title',
    defaultMessage: 'Contents',
  },
  published: {
    id: 'cms.content.status.published',
    defaultMessage: 'Published',
  },
  unpublished: {
    id: 'cms.content.status.unpublished',
    defaultMessage: 'Unpublished',
  },
  ready: {
    id: 'cms.content.status.pendingChanges',
    defaultMessage: 'Published, with pending changes',
  },
});

class ContentsStatusCard extends Component {
  componentDidMount() {
    const { onDidMount, userPermissions } = this.props;
    if (hasAccess(ADMINISTRATION_AREA_PERMISSION, userPermissions)) {
      onDidMount();
    }
  }

  render() {
    const {
      intl, userPermissions, language, contentsStatus, onClickContentList,
    } = this.props;
    const {
      unpublished, ready, published, total, latestModificationDate,
    } = contentsStatus;

    const msgs = {
      contents: intl.formatMessage(contentStatusMsgs.contents),
      published: intl.formatMessage(contentStatusMsgs.published),
      unpublished: intl.formatMessage(contentStatusMsgs.unpublished),
      ready: intl.formatMessage(contentStatusMsgs.ready),
    };

    const columns = [
      [msgs.published, published],
      [msgs.ready, ready],
      [msgs.unpublished, unpublished],
    ];

    const contentsAvailable = total > 0;

    const renderBody = !contentsAvailable ? (
      <div>
        <FormattedMessage id="cms.contents.notFound" defaultMessage="No contents were found on system." />
      </div>
    ) : (
      <DonutChart
        key={language}
        data={{
          colors: {
            [msgs.published]: '#6CA100',
            [msgs.ready]: '#F0AB00',
            [msgs.unpublished]: '#72767B',
          },
          columns,
          type: 'donut',
        }}
        title={{ type: 'total', secondary: msgs.contents }}
        legend={{ show: true, position: 'right' }}
        tooltip={{
          format: {
            value: v => v,
          },
        }}
      />
    );

    return (
      <div className="ContentsStatusCard">
        <ViewPermissionNoticeOverlay viewPermissions={ADMINISTRATION_AREA_PERMISSION}>
          <h2 className="ContentsStatusCard__title">
            <FormattedMessage
              id="cms.contents.contentStatus"
              defaultMessage="Content Status"
            />
          </h2>
          <span>
            {(latestModificationDate && contentsAvailable)
              ? formatDate(latestModificationDate) : null}
          </span>
          {renderBody}
          {
            hasAccess(
              [SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION],
              userPermissions,
            ) && (
              <div className="pull-right ContentsStatusCard__bottom-link">
                <Link onClick={onClickContentList}>
                  <FormattedMessage id="dashboard.contents.link" defaultMessage="Content List" />
                </Link>
              </div>
            )
          }
        </ViewPermissionNoticeOverlay>
      </div>
    );
  }
}

ContentsStatusCard.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func,
  onClickContentList: PropTypes.func,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  contentsStatus: PropTypes.shape({
    published: PropTypes.number,
    unpublished: PropTypes.number,
    ready: PropTypes.number,
    total: PropTypes.number,
    latestModificationDate: PropTypes.string,
  }).isRequired,
};

ContentsStatusCard.defaultProps = {
  onDidMount: () => {},
  onClickContentList: () => {},
  userPermissions: [],
};

export default injectIntl(ContentsStatusCard);
