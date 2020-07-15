import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Paginator } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { formatDate } from '@entando/utils';

class PagesList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount(page);
  }

  renderRows() {
    if (!this.props.pages) {
      return null;
    }
    return (
      this.props.pages.map(page => (
        <tr key={page.code}>
          <td className="FragmentListRow__td">
            <EllipsisWithTooltip style={{ maxWidth: 208 }} placement="bottom">
              {page.fullTitles[this.props.language]}
            </EllipsisWithTooltip>
          </td>
          <td className="FragmentListRow__td">
            <EllipsisWithTooltip style={{ maxWidth: 120 }} placement="bottom">
              {page.pageModel}
            </EllipsisWithTooltip>
          </td>
          <td className="FragmentListRow__td">{page.numWidget} widget(s)</td>
          <td className="FragmentListRow__td text-center">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="FragmentListRow__td">{formatDate(page.lastModified)}</td>
        </tr>
      ))
    );
  }

  render() {
    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5],
    };

    return (
      <div className="PagesList">
        <h2>
          List of Pages
        </h2>
        <table className="PagesListTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th width="32%"><FormattedMessage id="app.name" /></th>
              <th width="20%"><FormattedMessage id="pages.pageForm.pageTemplate" /></th>
              <th><FormattedMessage id="dashboard.numberWidgets" /></th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.status" />
              </th>
              <th width="19%"><FormattedMessage id="app.lastModified" /></th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
        />
        <br />
        <Button
          bsStyle="primary"
          className="pull-right"
          componentClass={Link}
          to={ROUTE_PAGE_ADD}
        >
          <FormattedMessage id="dashboard.newPage" />
        </Button>
        <Clearfix />
      </div>
    );
  }
}

PagesList.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    fullTitles: PropTypes.shape({
      en: PropTypes.string,
      it: PropTypes.string,
    }),
    status: PropTypes.string,
    numWidget: PropTypes.number,
    lastModified: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
};

PagesList.defaultProps = {
  pages: [],
};

export default PagesList;
