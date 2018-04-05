import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import PageModelListMenuActions from 'ui/page-models/list/PageModelListMenuActions';

class PageModelListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTable() {
    return (
      <table className="PageModelListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th><FormattedMessage id="app.code" /></th>
            <th><FormattedMessage id="app.name" /></th>
            <th className="text-center" width="10%">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  renderPaginator() {
    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };
    return (
      <Paginator
        pagination={pagination}
        viewType="table"
        itemCount={this.props.totalItems}
        onPageSet={this.changePage}
        onPerPageSelect={this.changePageSize}
      />
    );
  }

  renderRows() {
    const { removePageModel } = this.props;
    return (
      this.props.pageModels.map(pageModel => (
        <tr key={pageModel.code}>
          <td className="PageModelListTable__td">{pageModel.code}</td>
          <td className="PageModelListTable__td">{pageModel.descr}</td>
          <td className="PageModelListTable__td text-center">
            <PageModelListMenuActions
              code={pageModel.code}
              onClickDelete={() => removePageModel(pageModel.code)}
            />
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div className="PageModelListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          {this.renderPaginator()}
        </Spinner>
      </div>
    );
  }
}

PageModelListTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  pageModels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  removePageModel: PropTypes.func.isRequired,
};

PageModelListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  pageModels: [],
};

export default PageModelListTable;
