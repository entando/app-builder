import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DonutChart } from 'patternfly-react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const pageStatusMsgs = defineMessages({
  pages: {
    id: 'app.pages',
    defaultMessage: 'Pages',
  },
  published: {
    id: 'pages.status.published',
    defaultMessage: 'Online',
  },
  unpublished: {
    id: 'pages.status.unpublished',
    defaultMessage: 'Draft',
  },
  draft: {
    id: 'pages.status.draft',
    defaultMessage: 'Online ≠ Draft',
  },
});

class PageStatus extends Component {
  componentDidMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      language,
      intl,
      pageStatus: {
        draft, unpublished, published,
      },
    } = this.props;

    const msgs = Object.keys(pageStatusMsgs).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(pageStatusMsgs[curr]) }
    ), {});

    return (
      <div className="PageStatus">
        <h2><FormattedMessage id="dashboard.pageStatus" /></h2>
        <DonutChart
          key={language}
          data={{
            colors: {
              [msgs.published]: '#00A0DF',
              [msgs.unpublished]: '#A6A6A6',
              [msgs.draft]: '#0066CC',
            },
            columns: [
              [msgs.published, published],
              [msgs.unpublished, unpublished],
              [msgs.draft, draft],
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
      </div>
    );
  }
}

PageStatus.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  onWillMount: PropTypes.func.isRequired,
  pageStatus: PropTypes.shape({
    draft: PropTypes.number,
    unpublished: PropTypes.number,
    published: PropTypes.number,
  }).isRequired,
};

export default injectIntl(PageStatus);
