import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Paginator } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import { ROUTE_PAGE_ADD } from 'app-init/router';

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
    return (
      this.props.pages.map(page => (
        <tr key={page.code}>
          <td className="FragmentListRow__td">{page.fullTitles[this.props.language]}</td>
          <td className="FragmentListRow__td">{page.pageModel}</td>
          <td className="FragmentListRow__td">{page.numWidget} widget(s)</td>
          <td className="FragmentListRow__td text-center">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="FragmentListRow__td">{page.lastModified}</td>
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
          <Button
            bsStyle="primary"
            className="pull-right"
            componentClass={Link}
            route={ROUTE_PAGE_ADD}
          >
            <FormattedMessage id="dashboard.newPage" />
          </Button>
          <Clearfix />
        </h2>
        <table className="PagesListTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage id="app.name" /></th>
              <th><FormattedMessage id="pages.pageForm.pageModel" /></th>
              <th><FormattedMessage id="dashboard.numberWidgets" /></th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.status" />
              </th>
              <th><FormattedMessage id="app.lastModified" /></th>
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
