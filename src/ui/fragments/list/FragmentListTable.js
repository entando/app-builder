import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FragmentListMenuActions from 'ui/fragments/list/FragmentListMenuActions';

class FragmentListTable extends Component {
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
    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50, 100, 150],
    };
    return (
      <Col xs={12}>
        <table className="FragmentListTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage id="app.name" /></th>
              <th><FormattedMessage id="fragment.table.widgetType" /></th>
              <th className="text-center" width="10%">
                <FormattedMessage id="fragment.table.plugin" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="app.actions" />
              </th>
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
          onPerPageSelect={this.changePageSize}
        />
      </Col>);
  }

  renderRows() {
    return (
      this.props.fragments.map(fragment => (
        <tr key={fragment.code}>
          <td className="FragmentListRow__td">{fragment.code}</td>
          <td className="FragmentListRow__td">{fragment.widgetType ? fragment.widgetType.title : ''}</td>
          <td className="FragmentListRow__td text-center">{fragment.pluginCode}</td>
          <td className="FragmentListRow__td text-center">
            <FragmentListMenuActions code={fragment.code} {...this.props} />
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div className="FragmentListTable">
        <Spinner loading={!!this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

FragmentListTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    widgetType: PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    pluginCode: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

FragmentListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  fragments: [],
};

export default FragmentListTable;
