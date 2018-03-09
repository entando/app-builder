import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import DataTypeListMenuActions from 'ui/data-types/list/DataTypeListMenuActions';

class DataTypeListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount(page);
  }

  render() {
    const tr = this.props.datatypes.map(datatype => (
      <tr key={datatype.code}>
        <td className="DataTypeListRow__td">{datatype.name}</td>
        <td className="DataTypeListRow__td">{datatype.code}</td>
        <td className="DataTypeListRow__td text-center">{datatype.status}</td>
        <td className="DataTypeListRow__td text-center">
          <DataTypeListMenuActions code={datatype.code} />
        </td>
      </tr>
    ));

    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };
    return (
      <div className="DataTypeListTable">
        <Col md={12}>
          <table className="DataTypeListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="app.name" /></th>
                <th><FormattedMessage id="datatype.table.code" /></th>
                <th className="text-center" width="10%">
                  <FormattedMessage id="datatype.table.status" />
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
          />
        </Col>
      </div>
    );
  }
}

DataTypeListTable.propTypes = {
  onWillMount: PropTypes.func,
  datatypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

DataTypeListTable.defaultProps = {
  onWillMount: () => {},
  datatypes: [],
};

export default DataTypeListTable;
