import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paginator, Spinner } from 'patternfly-react';
import DataModelListActionsMenu from 'ui/data-models/common/DataModelListActionsMenu';


class DataModelListTable extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.items = [];
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

  render() {
    const tr = this.props.dataModels.map(item => (
      <tr key={item.modelId}>
        <td className="DataModelListRow__td">{item.descr}</td>
        <td className="DataModelListRow__td">{item.type}</td>
        <td className="DataModelListRow__td text-center">{item.modelId}</td>
        <td className="DataModelListRow__td text-center">
          <DataModelListActionsMenu
            code={item.type}
            onClickEdit={() => this.props.onClickEdit(item.modelId)}
          />
        </td>
      </tr>
    ));

    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    return (
      <div className="DataModelListTable">
        <Spinner loading={!!this.props.loading}>
          <table className="DataModelListTable__wrap table table-striped table-bordered">
            <thead>
              <tr>
                <th width="30%"><FormattedMessage id="app.name" /></th>
                <th>
                  <FormattedMessage id="app.type" />
                </th>
                <th className="text-center" width="10%">
                  <FormattedMessage id="app.id" />
                </th>
                <th className="text-center" width="10%">
                  <FormattedMessage id="app.actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tr}
            </tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
        </Spinner>
      </div>
    );
  }
}
DataModelListTable.propTypes = {
  onWillMount: PropTypes.func,
  onClickEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  dataModels: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
    modelId: PropTypes.string.isRequired,
  })),
};

DataModelListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  dataModels: [],
};

export default DataModelListTable;
