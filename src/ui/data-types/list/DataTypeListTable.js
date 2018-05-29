import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import DataTypeListMenuActions from 'ui/data-types/list/DataTypeListMenuActions';
import DataTypeStatusIcon from 'ui/data-types/common/DataTypeStatusIcon';
import DeleteDataTypeModalContainer from 'ui/data-types/common/DeleteDataTypeModalContainer';
import DataTypeReferenceStatusContainer from 'ui/data-types/common/DataTypeReferenceStatusContainer';

class DataTypeListTable extends Component {
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

  renderTableRows() {
    return this.props.datatypes.map(datatype => (
      <tr key={datatype.name}>
        <td className="DataTypeListRow__td">{datatype.name}</td>
        <td className="DataTypeListRow__td text-center">{datatype.code}</td>
        <td className="DataTypeListRow__td text-center">
          <DataTypeStatusIcon
            status={datatype.status}
            title={formattedText('dataType.table.status', null, { status: datatype.status })}
          />
        </td>
        <td className="DataTypeListRow__td text-center">
          <DataTypeListMenuActions
            code={datatype.code}
            onClickDelete={this.props.onClickDelete}
            onClickReload={this.props.onClickReload}
          />
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.datatypes.length > 0) {
      const pagination = {
        page: this.props.page,
        perPage: this.props.pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      return (
        <Col xs={12}>
          <table className="DataTypeListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="app.name" /></th>
                <th className="DataTypeListTable__th-sm text-center">
                  <FormattedMessage id="app.code" />
                </th>
                <th className="DataTypeListTable__th-xs text-center">
                  <FormattedMessage id="dataType.table.status" />
                </th>
                <th className="DataTypeListTable__th-xs text-center">
                  <FormattedMessage id="app.actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
          <br />
          <DataTypeReferenceStatusContainer />
        </Col>

      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="dataType.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="DataTypeListTable">
        <Spinner loading={!!this.props.loading} >
          {this.renderTable()}


        </Spinner>
        <DeleteDataTypeModalContainer />
      </div>
    );
  }
}

DataTypeListTable.propTypes = {
  onWillMount: PropTypes.func,
  onClickDelete: PropTypes.func.isRequired,
  onClickReload: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  datatypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

DataTypeListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  datatypes: [],
};

export default DataTypeListTable;
