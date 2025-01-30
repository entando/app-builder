import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackedBarChart } from 'patternfly-react';
import { hasAccess } from '@entando/utils';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import { SUPERUSER_PERMISSION, MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

const pageStatusMsgs = defineMessages({
  pages: { id: 'app.pages', defaultMessage: 'Pages' },
  published: { id: 'pages.status.published', defaultMessage: 'Published' },
  draft: {
    id: 'pages.status.draft',
    defaultMessage: 'Published, with pending changes',
  },
  unpublished: {
    id: 'pages.status.unpublished',
    defaultMessage: 'Unpublished',
  },
});

class PageStatus extends Component {
  componentDidMount() {
    const { userPermissions, onWillMount } = this.props;
    if (hasAccess(MANAGE_PAGES_PERMISSION, userPermissions)) {
      onWillMount();
    }
  }

  render() {
    const {
      language,
      userPermissions,
      intl,
      pageStatus: {
        draft, unpublished, published, lastUpdate,
      },
    } = this.props;

    const msgs = Object.keys(pageStatusMsgs).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: intl.formatMessage(pageStatusMsgs[curr]),
      }),
      {},
    );

    return (
      <div className="PageStatus">
        <ViewPermissionNoticeOverlay viewPermissions={MANAGE_PAGES_PERMISSION}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2>
                <FormattedMessage
                  id="dashboard.pageStatus"
                  defaultMessage="Page Status"
                />
              </h2>
              <span>{lastUpdate}</span>
            </div>
            {hasAccess(
              [SUPERUSER_PERMISSION, MANAGE_PAGES_PERMISSION],
              userPermissions,
            ) && (
              <Link to={ROUTE_PAGE_TREE}>
                <FormattedMessage id="dashboard.pageList" defaultMessage="Page List" />
              </Link>
            )}
          </div>
          <StackedBarChart
            key={language}
            className="stacked-bar-chart"
            data={{
              columns: [
                [msgs.published, published],
                [msgs.draft, draft],
                [msgs.unpublished, unpublished],
              ],
              type: 'bar',
              order: (a, b) =>
                (a.id === msgs.published || b.id === msgs.published ? a - b : b - a),
              groups: [[msgs.published, msgs.draft, msgs.unpublished]],
              colors: {
                [msgs.published]: '#39AC73',
                [msgs.draft]: '#FFB219',
                [msgs.unpublished]: '#72767B',
              },
            }}
            axis={{ rotated: true, x: { show: false }, y: { show: false } }}
            grid={{ x: { show: false }, y: { show: false } }}
            bar={{ width: 100 }}
            tooltip={{
              tooltip: { show: true },
              format: {
                value: v =>
                  `${v} ${intl.formatMessage({
                    id: `app.page${v !== 1 ? 's' : ''}`,
                    defaultMessage: v !== 1 ? 'Pages' : 'Page',
                  })}`,
              },
            }}
            legend={{ show: false }}
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
                  id={`app.page${published !== 1 ? 's' : ''}`}
                  defaultMessage={published !== 1 ? 'Pages' : 'Page'}
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
                {draft}{' '}
                <FormattedMessage
                  id={`app.page${draft !== 1 ? 's' : ''}`}
                  defaultMessage={draft !== 1 ? 'Pages' : 'Page'}
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
                  id={`app.page${unpublished !== 1 ? 's' : ''}`}
                  defaultMessage={unpublished !== 1 ? 'Pages' : 'Page'}
                />
              </div>
            </div>
          </div>
        </ViewPermissionNoticeOverlay>
      </div>
    );
  }
}

PageStatus.propTypes = {
  intl: intlShape.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  language: PropTypes.string.isRequired,
  onWillMount: PropTypes.func.isRequired,
  pageStatus: PropTypes.shape({
    draft: PropTypes.number,
    unpublished: PropTypes.number,
    published: PropTypes.number,
    lastUpdate: PropTypes.string,
  }).isRequired,
};

PageStatus.defaultProps = { userPermissions: [] };

export default injectIntl(PageStatus);
