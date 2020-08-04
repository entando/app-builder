import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DonutChart } from 'patternfly-react';
import { hasAccess } from '@entando/utils';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { ROUTE_PAGE_TREE } from 'app-init/router';
import { ROLE_SUPERUSER, MANAGE_PAGES_PERMISSION } from 'state/permissions/const';

const pageStatusMsgs = defineMessages({
  pages: {
    id: 'app.pages',
    defaultMessage: 'Pages',
  },
  published: {
    id: 'pages.status.published',
    defaultMessage: 'Published',
  },
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
    this.props.onWillMount();
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

    const msgs = Object.keys(pageStatusMsgs).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(pageStatusMsgs[curr]) }
    ), {});

    return (
      <div className="PageStatus">
        <h2><FormattedMessage id="dashboard.pageStatus" /></h2>
        <span>{lastUpdate}</span>
        <DonutChart
          key={language}
          data={{
            colors: {
              [msgs.published]: '#6CA100',
              [msgs.draft]: '#F0AB00',
              [msgs.unpublished]: '#72767B',
            },
            columns: [
              [msgs.published, published],
              [msgs.draft, draft],
              [msgs.unpublished, unpublished],
            ],
            type: 'donut',
          }}
          title={{ type: 'total', secondary: msgs.pages }}
          legend={{ show: true, position: 'right' }}
          tooltip={{
            format: {
            value: v => v,
            },
          }}
        />
        {
          hasAccess([ROLE_SUPERUSER, MANAGE_PAGES_PERMISSION], userPermissions) && (
            <div className="PageStatus__bottom-link">
              <Link to={ROUTE_PAGE_TREE}>
                <FormattedMessage id="dashboard.pageList" defaultMessage="Page List" />
              </Link>
            </div>
          )
        }
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
  }).isRequired,
};

PageStatus.defaultProps = {
  userPermissions: [],
};

export default injectIntl(PageStatus);
