import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paginator } from 'patternfly-react';
import DataModelListActionsMenu from 'ui/data-models/common/DataModelListActionsMenu';


class DataModelListTable extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.items = [];
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount(page);
  }

  render() {
    const tr = this.props.dataModels.map(item => (
      <tr key={item.type}>
        <td className="DataModelListRow__td">{item.type}</td>
        <td className="DataModelListRow__td">{item.descr}</td>
        <td className="DataModelListRow__td text-center">{item.modelId}</td>
        <td className="DataModelListRow__td text-center">
          <DataModelListActionsMenu code={item.type} />
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
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage id="app.name" /></th>
              <th className="text-center">
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
        />
      </div>
    );
  }
}
DataModelListTable.propTypes = {
  onWillMount: PropTypes.func,
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
  dataModels: [],
};

export default DataModelListTable;
