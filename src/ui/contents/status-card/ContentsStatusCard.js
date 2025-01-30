import React, { Component } from 'react';
import { StackedBarChart } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { formatDate, hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

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
      intl,
      userPermissions,
      language,
      contentsStatus,
      onClickContentList,
    } = this.props;
    const {
      unpublished, ready, published, total, latestModificationDate,
    } =
      contentsStatus;

    const msgs = {
      contents: intl.formatMessage(contentStatusMsgs.contents),
      published: intl.formatMessage(contentStatusMsgs.published),
      unpublished: intl.formatMessage(contentStatusMsgs.unpublished),
      ready: intl.formatMessage(contentStatusMsgs.ready),
    };

    const contentsAvailable = total > 0;

    const renderBody = !contentsAvailable ? (
      <div>
        <FormattedMessage
          id="cms.contents.notFound"
          defaultMessage="No contents were found on system."
        />
      </div>
    ) : (
      <div>
        <StackedBarChart
          key={language}
          className="stacked-bar-chart"
          data={{
            columns: [
              [msgs.published, published],
              [msgs.ready, ready],
              [msgs.unpublished, unpublished],
            ],
            type: 'bar',
            order: (a, b) => {
              if (a.id === msgs.published || b.id === msgs.published) {
                return a - b;
              }
              return b - a;
            },
            groups: [[msgs.published, msgs.ready, msgs.unpublished]], // For stacking
            colors: {
              [msgs.published]: '#39AC73',
              [msgs.ready]: '#FFB219',
              [msgs.unpublished]: '#72767B',
            },
          }}
          axis={{
            rotated: true, // Rotate the chart for horizontal bars
            x: { show: false }, // Hide X-axis
            y: { show: false }, // Hide Y-axis
          }}
          grid={{ x: { show: false }, y: { show: false } }}
          bar={{ width: 100 }} // Adjust bar thickness
          tooltip={{
            format: {
              value: v =>
                `${v} ${intl.formatMessage({
                  id: `app.content${v !== 1 ? 's' : ''}`,
                  defaultMessage: v !== 1 ? 'Content' : 'Contents',
                })}`,
            },
          }}
          legend={{ show: false }} // Hide legend
          size={{ height: 20 }}
        />
        <div style={{ marginTop: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4px 0',
              borderBottom: '1px solid rgba(228, 231, 236, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#39AC73',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              />
              <FormattedMessage
                id="cms.content.status.published"
                defaultMessage="Published"
              />
            </div>
            <div>
              {published}{' '}
              <FormattedMessage
                id={`app.content${published !== 1 ? 's' : ''}`}
                defaultMessage={published !== 1 ? 'Contents' : 'Content'}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4px 0',
              borderBottom: '1px solid rgba(228, 231, 236, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#FFB219',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              />
              <FormattedMessage
                id="cms.content.status.pendingChanges"
                defaultMessage="Published, with pending changes"
              />
            </div>
            <div>
              {ready}{' '}
              <FormattedMessage
                id={`app.content${ready !== 1 ? 's' : ''}`}
                defaultMessage={ready !== 1 ? 'Contents' : 'Content'}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4px 0',
              borderBottom: '1px solid rgba(228, 231, 236, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#72767B',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              />
              <FormattedMessage
                id="cms.content.status.unpublished"
                defaultMessage="Unpublished"
              />
            </div>
            <div>
              {unpublished}{' '}
              <FormattedMessage
                id={`app.content${unpublished !== 1 ? 's' : ''}`}
                defaultMessage={unpublished !== 1 ? 'Contents' : 'Content'}
              />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="ContentsStatusCard">
        <ViewPermissionNoticeOverlay
          viewPermissions={ADMINISTRATION_AREA_PERMISSION}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2 className="ContentsStatusCard__title">
                <FormattedMessage
                  id="cms.contents.contentStatus"
                  defaultMessage="Content Status"
                />
              </h2>
              <span>
                {latestModificationDate && contentsAvailable
                  ? formatDate(latestModificationDate)
                  : null}
              </span>
            </div>
            {hasAccess(
              [
                SUPERUSER_PERMISSION,
                CRUD_CONTENTS_PERMISSION,
                VALIDATE_CONTENTS_PERMISSION,
              ],
              userPermissions,
            ) && (
              <Link onClick={onClickContentList}>
                <FormattedMessage
                  id="dashboard.contents.link"
                  defaultMessage="Content List"
                />
              </Link>
            )}
          </div>
          {renderBody}
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
